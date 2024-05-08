/** Processes a query object into a Mongoose query request object */
export function processQuery(query, Model) {
  /** Filter reserved keywords */
  const queryObj = {...query};
  ['page', 'sort', 'limit', 'fields'].forEach(iten => delete queryObj[iten]);

  /** Refactor if any: gte, gt, lt, lte operators */
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  /** Create mongoose query request object */
  let result = Model.find(JSON.parse(queryStr));

  /**  Sort query */
  if (query.sort) result = result.sort(query.sort.split(',').join(' '));
  else result = result.sort('-createdAt');

  /** Limit fields */
  if (query.fields) result = result.select(query.fields.split(',').join(' '));
  else result.select('-__v -createdAt');

  return result;
}
