/* eslint-disable */
import { Document, FilterQuery, Model, SortOrder } from "mongoose";

export function buildPaginator<Entity extends Document>(
  model: Model<Entity>,
  options: PaginationOptions<Entity> = {},
): Paginator<Entity> {
  const { paginationKeys = ["_id" as keyof Entity], query = {} } = options;

  const paginator = new Paginator(model, paginationKeys);

  if (query.afterCursor) {
    paginator.setAfterCursor(query.afterCursor);
  }

  if (query.beforeCursor) {
    paginator.setBeforeCursor(query.beforeCursor);
  }

  if (query.limit) {
    paginator.setLimit(query.limit);
  }

  if (query.order) {
    paginator.setOrder(query.order as Order);
  }

  return paginator;
}

export default class Paginator<Entity extends Document> {
  private afterCursor: string | null = null;
  private beforeCursor: string | null = null;
  private nextAfterCursor: string | null = null;
  private nextBeforeCursor: string | null = null;
  private limit = 100;
  private order: Order = Order.DESC;

  public constructor(
    private model: Model<Entity>,
    private paginationKeys: (keyof Entity)[],
  ) {}

  public setAfterCursor(cursor: string): void {
    this.afterCursor = cursor;
  }

  public setBeforeCursor(cursor: string): void {
    this.beforeCursor = cursor;
  }

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public setOrder(order: Order): void {
    this.order = order;
  }

  public async paginate(filter: FilterQuery<Entity> = {}): Promise<PagingResult<Entity>> {
    const query = this.model.find(filter);

    // Apply cursor conditions
    const cursorFilter = this.buildCursorFilter();
    if (Object.keys(cursorFilter).length > 0) {
      query.where(cursorFilter);
    }

    // Apply sorting
    const sortOptions = this.buildSortOptions();
    query.sort(sortOptions);

    // Apply limit (+1 to check if there are more results)
    query.limit(this.limit + 1);

    const entities = await query.exec();
    const hasMore = entities.length > this.limit;

    if (hasMore) {
      entities.splice(entities.length - 1, 1);
    }

    if (entities.length === 0) {
      return this.toPagingResult(entities);
    }

    // Handle reverse order for beforeCursor
    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      entities.reverse();
    }

    // Set next cursors
    if (this.hasBeforeCursor() || hasMore) {
      this.nextAfterCursor = this.encode(entities[entities.length - 1]);
    }

    if (this.hasAfterCursor() || (hasMore && this.hasBeforeCursor())) {
      this.nextBeforeCursor = this.encode(entities[0]);
    }

    return this.toPagingResult(entities);
  }

  private buildCursorFilter(): FilterQuery<Entity> {
    const filter: FilterQuery<Entity> = {};

    if (!this.hasAfterCursor() && !this.hasBeforeCursor()) {
      return filter;
    }

    const cursor = this.hasAfterCursor() ? this.afterCursor : this.beforeCursor;
    const decodedCursor = this.decode(cursor!);
    const operator = this.getOperator();

    // Build cursor filter conditions
    const orConditions: FilterQuery<Entity>[] = [];

    for (let i = 0; i < this.paginationKeys.length; i++) {
      const andConditions: FilterQuery<any> = {};

      // Add equality conditions for all previous keys
      for (let j = 0; j < i; j++) {
        const key = this.paginationKeys[j];

        andConditions[key as string] = decodedCursor[key as string];
      }

      // Add comparison condition for current key
      const currentKey = this.paginationKeys[i];
      andConditions[currentKey as string] = {
        [operator]: decodedCursor[currentKey as string],
      };

      orConditions.push(andConditions);
    }

    if (orConditions.length === 1) {
      Object.assign(filter, orConditions[0]);
    } else if (orConditions.length > 1) {
      filter.$or = orConditions;
    }

    return filter;
  }

  private buildSortOptions(): Record<string, SortOrder> {
    let { order } = this;

    // Flip order for beforeCursor
    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      order = this.flipOrder(order);
    }

    const sortOptions: Record<string, SortOrder> = {};

    for (const key of this.paginationKeys) {
      sortOptions[key as string] = order === Order.ASC ? 1 : -1;
    }

    return sortOptions;
  }

  private getOperator(): string {
    if (this.hasAfterCursor()) {
      return this.order === Order.ASC ? "$gt" : "$lt";
    }

    if (this.hasBeforeCursor()) {
      return this.order === Order.ASC ? "$lt" : "$gt";
    }

    return "$eq";
  }

  private hasAfterCursor(): boolean {
    return this.afterCursor !== null;
  }

  private hasBeforeCursor(): boolean {
    return this.beforeCursor !== null;
  }

  private encode(entity: Entity): string {
    const payload = this.paginationKeys
      .map((key) => {
        const value = entity[key];
        const encodedValue = this.encodeValue(value);
        return `${String(key)}:${encodedValue}`;
      })
      .join(",");

    return btoa(payload);
  }

  private decode(cursor: string): Record<string, any> {
    const cursors: Record<string, any> = {};
    const columns = atob(cursor).split(",");

    for (const column of columns) {
      const [key, encodedValue] = column.split(":");
      const value = this.decodeValue(encodedValue);
      cursors[key] = value;
    }

    return cursors;
  }

  private encodeValue(value: any): string {
    if (value === null || value === undefined) {
      return "null";
    }

    if (value instanceof Date) {
      return `date:${value.getTime()}`;
    }

    if (typeof value === "object" && value.toString) {
      // Handle MongoDB ObjectId and other objects with toString method
      return `object:${encodeURIComponent(value.toString())}`;
    }

    if (typeof value === "string") {
      return `string:${encodeURIComponent(value)}`;
    }

    if (typeof value === "number") {
      return `number:${value}`;
    }

    if (typeof value === "boolean") {
      return `boolean:${value}`;
    }

    throw new Error(`Unsupported cursor value type: ${typeof value}`);
  }

  private decodeValue(encodedValue: string): any {
    if (encodedValue === "null") {
      return null;
    }

    const [type, value] = encodedValue.split(":", 2);

    switch (type) {
      case "date": {
        const timestamp = parseInt(value, 10);
        if (Number.isNaN(timestamp)) {
          throw new Error("Invalid date timestamp in cursor");
        }
        return new Date(timestamp);
      }

      case "object": {
        return decodeURIComponent(value);
      }

      case "string": {
        return decodeURIComponent(value);
      }

      case "number": {
        const num = parseFloat(value);
        if (Number.isNaN(num)) {
          throw new Error("Invalid number in cursor");
        }
        return num;
      }

      case "boolean": {
        return value === "true";
      }

      default: {
        throw new Error(`Unknown cursor value type: ${type}`);
      }
    }
  }

  private flipOrder(order: Order): Order {
    return order === Order.ASC ? Order.DESC : Order.ASC;
  }

  private getCursor(): Cursor {
    return {
      afterCursor: this.nextAfterCursor,
      beforeCursor: this.nextBeforeCursor,
    };
  }

  private toPagingResult(entities: Entity[]): PagingResult<Entity> {
    return {
      data: entities,
      cursor: this.getCursor(),
    };
  }
}

export interface PagingQuery {
  afterCursor?: string;
  beforeCursor?: string;
  limit?: number;
  order?: Order | "ASC" | "DESC";
}

export interface PaginationOptions<Entity> {
  paginationKeys?: (keyof Entity)[];
  query?: PagingQuery;
}

export interface CursorParam {
  [key: string]: any;
}

export interface Cursor {
  beforeCursor: string | null;
  afterCursor: string | null;
}

export interface PagingResult<Entity> {
  data: Entity[];
  cursor: Cursor;
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

function atob(value: string): string {
  return Buffer.from(value, "base64").toString();
}

function btoa(value: string): string {
  return Buffer.from(value).toString("base64");
}
