import { Query } from "mongoose";

type MongoQueryOptions = {
  select?: string[];
  projection?: Record<string, any>;
  lean?: boolean;
  populate?: any;
};

export function applyMongoQueryOptions<T>(
  query: Query<T, any>,
  options?: MongoQueryOptions,
): Query<T, any> {
  const { select, projection, lean = true, populate } = options || {};

  if (!options) return query;

  if (select?.length) {
    query.select(select.join(" "));
  }

  if (projection) {
    query.select(projection);
  }

  if (lean) {
    query.lean();
  }

  if (populate) {
    query.populate(populate);
  }

  return query;
}
