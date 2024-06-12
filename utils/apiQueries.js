export function apiQueries(query, Model) {
  /** Filter reserved keywords */
  const queryObj = { ...query };
  ['sort', 'fields', 'limit', 'page'].forEach(iten => delete queryObj[iten]);

  /** Refactor if any: gte, gt, lt, lte operators */
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  /** Create mongoose query request object */
  let result = Model.find(JSON.parse(queryStr));

  /**  Sort query */
  if (query.sort) result = result.sort(query.sort.split(',').join(' '));
  else result = result.sort('-createdAt');

  /** Fields selected */
  if (query.fields) result = result.select(query.fields.split(',').join(' '));
  else result.select('-__v -createdAt -updatedAt');

  /** Pagination */
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  return result;
}
