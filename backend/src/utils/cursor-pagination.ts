/* eslint-disable */
import { Document, Model, Query } from "mongoose";

export function buildPaginator<T extends Document>(
  model: Model<T>,
  options: PaginationOptions<T> = {},
): Paginator<T> {
  const paginator = new Paginator(model, options);
  return paginator;
}

export default class Paginator<T extends Document> {
  private afterCursor: string | null = null;
  private beforeCursor: string | null = null;
  private nextAfterCursor: string | null = null;
  private nextBeforeCursor: string | null = null;
  private limit = 100;
  private order: Order = Order.DESC;
  private paginationKeys: string[];

  public constructor(
    private model: Model<T>,
    private options: PaginationOptions<T> = {},
  ) {
    this.paginationKeys = options.paginationKeys || ["_id"];
  }

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

  public async paginate(query: any = {}): Promise<PagingResult<T>> {
    const mongoQuery = this.buildQuery(query);
    const entities = await mongoQuery.exec();
    const hasMore = entities.length > this.limit;

    if (hasMore) {
      entities.pop();
    }

    if (entities.length === 0) {
      return this.toPagingResult(entities);
    }

    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      entities.reverse();
    }

    if (this.hasBeforeCursor() || hasMore) {
      this.nextAfterCursor = this.encode(entities[entities.length - 1]);
    }

    if (this.hasAfterCursor() || (hasMore && this.hasBeforeCursor())) {
      this.nextBeforeCursor = this.encode(entities[0]);
    }

    return this.toPagingResult(entities);
  }

  private getCursor(): Cursor {
    return {
      afterCursor: this.nextAfterCursor,
      beforeCursor: this.nextBeforeCursor,
    };
  }

  private buildQuery(baseQuery: any = {}): Query<T[], T> {
    let query = this.model.find(baseQuery);
    const cursors: CursorParam = {};

    if (this.hasAfterCursor()) {
      Object.assign(cursors, this.decode(this.afterCursor as string));
    } else if (this.hasBeforeCursor()) {
      Object.assign(cursors, this.decode(this.beforeCursor as string));
    }

    if (Object.keys(cursors).length > 0) {
      query = query.where(this.buildCursorQuery(cursors));
    }

    query = query.limit(this.limit + 1);

    const sortOrder = this.buildSortOrder();
    query = query.sort(sortOrder);

    return query;
  }

  private buildCursorQuery(cursors: CursorParam): any {
    const operator = this.getOperator();
    const conditions: any[] = [];

    for (let i = 0; i < this.paginationKeys.length; i++) {
      const key = this.paginationKeys[i];
      const condition: any = {};

      // Build condition for this level
      for (let j = 0; j < i; j++) {
        const prevKey = this.paginationKeys[j];
        condition[prevKey] = cursors[prevKey];
      }

      condition[key] = { [operator]: cursors[key] };
      conditions.push(condition);
    }

    return conditions.length > 1 ? { $or: conditions } : conditions[0];
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

  private buildSortOrder(): any {
    let order = this.order;

    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      order = this.flipOrder(order);
    }

    const sortOrder: any = {};
    this.paginationKeys.forEach((key) => {
      sortOrder[key] = order === Order.ASC ? 1 : -1;
    });

    return sortOrder;
  }

  private hasAfterCursor(): boolean {
    return this.afterCursor !== null;
  }

  private hasBeforeCursor(): boolean {
    return this.beforeCursor !== null;
  }

  private encode(entity: T): string {
    const payload = this.paginationKeys
      .map((key) => {
        const value = (entity as any)[key];
        const encodedValue = this.encodeValue(value);
        return `${key}:${encodedValue}`;
      })
      .join(",");

    return btoa(payload);
  }

  private decode(cursor: string): CursorParam {
    const cursors: CursorParam = {};
    const columns = atob(cursor).split(",");

    columns.forEach((column) => {
      const [key, raw] = column.split(":");
      cursors[key] = this.decodeValue(raw);
    });

    return cursors;
  }

  private encodeValue(value: any): string {
    if (value === null || value === undefined) return "null";

    if (value instanceof Date) {
      return value.getTime().toString();
    }

    if (typeof value === "object") {
      return encodeURIComponent(value.toString());
    }

    return encodeURIComponent(value.toString());
  }

  private decodeValue(value: string): any {
    if (value === "null") return null;

    // Try to parse as number (timestamp)
    const num = parseInt(value, 10);
    if (!isNaN(num) && num.toString() === value) {
      // Check if it's a timestamp (reasonable range)
      if (num > 1000000000000) {
        return new Date(num);
      }
      return num;
    }

    return decodeURIComponent(value);
  }

  private flipOrder(order: Order): Order {
    return order === Order.ASC ? Order.DESC : Order.ASC;
  }

  private toPagingResult(entities: T[]): PagingResult<T> {
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

export interface PaginationOptions<T> {
  paginationKeys?: string[];
  query?: PagingQuery;
}

export interface CursorParam {
  [key: string]: any;
}

export interface Cursor {
  beforeCursor: string | null;
  afterCursor: string | null;
}

export interface PagingResult<T> {
  data: T[];
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
