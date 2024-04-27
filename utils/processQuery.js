/**
 * Processes a user-provided query object and transforms it into a Mongoose query request object for efficient database retrieval.
 *
 * @param {Object} query - The query object containing filters and options provided by the user.
 * @param {mongoose.Model} Model - The Mongoose model representing the data collection to be queried.
 * @returns {mongoose.Query} - A Mongoose query object ready for execution.
 *
 * @example
 * ```javascript
 * const query = {
 *   name: 'John Doe',
 *   age: { gte: 21 },
 *   sort: 'name, -age',
 *   fields: 'name, age',
 };
 * const User = mongoose.model('User');
 *
 * processQuery(query, User)
 *   .then(users => console.log(users))
 *   .catch(error => console.error(error));
 * ```
 */
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
