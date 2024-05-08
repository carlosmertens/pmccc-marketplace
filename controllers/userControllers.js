import bcrypt from 'bcrypt';
import _ from 'lodash';
import {User, joi} from '../models/UserModel.js';
import {hashPassword} from '../utils/hashPassword.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/**
 * Get (GET REQUEST) all users from the database
 * Auth middleware restricted
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const getAllUsers = async (req, res) => {
  /** Call util function to process query request */
  const query = processQuery(req.query, User);

  /** Execute query request to database */
  const users = await query;

  /** Send a successful response with all user data */
  res.status(200).send({
    status: 'success',
    message: 'GET request to get all users was successful',
    result: users.length,
    data: users,
  });
};

/**
 * Get (GET REQUEST) a user from the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function getUser(req, res, next) {
  const user = await User.findById(req.params.id).select(
    '-__v -createdAt -updatedAt -password'
  );

  /** Check if the user exists */
  if (!user) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the user data */
  res.send({
    status: 'success',
    message: 'GET request for one user by id',
    data: user,
  });
}

// TODO:
// if password is changed, needs to be hash again before saving it in the database

/**
 * Update (PUT REQUEST) a user in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function updateUser(req, res, next) {
  /** Validate data with Joi validation function */
  const {error} = joi.validateUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** If password changes, hash it */
  if (req.body.password)
    req.body.password = await hashPassword(req.body.password, next);

  /** Find user in the database */
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select('-__v -createdAt -updatedAt -password');

  /** Check if the user exists */
  if (!user) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated user data */
  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a user by id',
    data: user,
  });
}

/**
 * Modify (PATCH REQUEST) a user in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function patchUser(req, res, next) {
  /** Validate data with Joi validation function */
  const {error} = joi.validatePatch(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** If password changes, hash it */
  if (req.body.password)
    req.body.password = await hashPassword(req.body.password, next);

  /** Find user in the database */
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select('-__v -createdAt -updatedAt -password');

  /** Check if the user exists */
  if (!user) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the updated user data */
  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify user successfully',
    data: user,
  });
}

/**
 * Delete (DELETE REQUEST) a user in the database by its id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function deleteUser(req, res, next) {
  const user = await User.findByIdAndDelete(req.params.id);

  /** Check if the user exists */
  if (!user) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the user deleted */
  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.params.id} has been successfully`,
    data: _.pick(user, ['_id', 'firstName', 'lastName', 'email']),
  });
}

/**
 * Signup (POST REQUEST) a new user in the database
 * Response a JWT token on success
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function signUpUser(req, res, next) {
  /** Validate data with Joi validation function */
  const {error} = joi.validateUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** Find user in the database */
  let user = await User.findOne({email: req.body.email});
  if (user) return next(new CreateAppError('User already exists!', 400));

  /** Create new user */
  user = new User(req.body);

  /** Hash password and save it */
  user.password = await hashPassword(user.password, next);

  /** Save new user in the database */
  // await User.create(user);
  await user.save();

  /** Generate JWT token */
  const token = user.generateJWT();

  /** Send a successful response with token attached to the header */
  res
    .status(201)
    .header('x-auth-token', token)
    .send({
      status: 'success',
      message: 'User added in the database!',
      data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
      xAuthToken: token,
    });
}

// TODO:
// Create middleware for auth = authentication (pass and token)
// Create admin middleware

/**
 * Login (POST REQUEST) a user
 * Response a JWT token on success
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function loginUser(req, res, next) {
  /** Validate data with Joi function */
  const {error} = joi.validateLogin(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** Find user in the database */
  const user = await User.findOne({email: req.body.email});
  if (!user) return next(new CreateAppError('User Not found!', 404));

  /** Verify password */
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return next(new CreateAppError('Incorrect password!', 400));

  /** Generate JWT token */
  const token = user.generateJWT();

  /** Send a successful response with the token attached to the header */
  res.header('x-auth-token', token).send({
    status: 'success',
    message: 'User logged, JWT token generated',
    data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
    xAuthToken: token,
  });
}

export const controllers = {
  getAllUsers,
  getUser,
  updateUser,
  patchUser,
  deleteUser,
  signUpUser,
  loginUser,
};
