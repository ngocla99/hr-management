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
  if (!options) return query;

  if (options.select?.length) {
    query.select(options.select.join(" "));
  }

  if (options.projection) {
    query.select(options.projection);
  }

  if (options.lean) {
    query.lean();
  }

  if (options.populate) {
    query.populate(options.populate);
  }

  return query;
}
