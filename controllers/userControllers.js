import _ from 'lodash';
import bcrypt from 'bcrypt';
import {User, joi} from '../models/UserModel.js';
import {hashPassword} from '../utils/hashPassword.js';
import {CreateAppError} from '../utils/createAppError.js';
import {processQuery} from '../utils/processQuery.js';

/** (GET REQUEST) */
export const getAllUsers = async (req, res) => {
  const query = processQuery(req.query, User);
  const users = await query;

  res.status(200).send({
    status: 'success',
    message: 'GET request to get all users was successful',
    result: users.length,
    data: users,
  });
};

/** (POST REQUEST) */
async function createNewUser(req, res, next) {
  const {error} = joi.validateUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  let user = await User.findOne({email: req.body.email});
  if (user) return next(new CreateAppError('User already exists!', 400));

  user = new User(req.body);

  user.password = await hashPassword(user.password, next);

  await user.save();

  const token = user.generateJWT();

  res
    .status(201)
    .header('x-auth-token', token)
    .send({
      status: 'success',
      message: 'User added in the database!',
      data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
    });
}

/** (GET REQUEST) */
async function getUser(req, res, next) {
  const user = await User.findById(req.user._id).select(
    '-__v -createdAt -updatedAt -password'
  );
  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.send({
    status: 'success',
    message: 'GET request for one user by id',
    data: user,
  });
}

/** (PUT REQUEST) */
async function updateUser(req, res, next) {
  const {error} = joi.validateUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  req.body.password = await hashPassword(req.body.password, next);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  }).select('-__v -createdAt -updatedAt -password');
  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PUT request to update a user by id',
    data: user,
  });
}

/** (PATCH REQUEST) */
async function patchUser(req, res, next) {
  const {error} = joi.validatePatch(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  if (req.body.password)
    req.body.password = await hashPassword(req.body.password, next);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  }).select('-__v -createdAt -updatedAt -password');

  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'PATCH request to modify user successfully',
    data: user,
  });
}

/** (DELETE REQUEST) */
async function deleteUser(req, res, next) {
  const user = await User.findByIdAndDelete(req.user._id);

  /** Check if the user exists */
  if (!user) return next(new CreateAppError('Given id not found', 404));

  /** Send a successful response with the user deleted */
  res.status(200).send({
    status: 'success',
    message: `DELETE request for id: ${req.user._id} has been successfully`,
    data: _.pick(user, ['_id', 'firstName', 'lastName', 'email']),
  });
}

/** Login (POST REQUEST) a user */
async function loginUser(req, res, next) {
  /** Validate login data with Joi validate function */
  const {error} = joi.validateLogin(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** Find user in MongoDB database */
  const user = await User.findOne({email: req.body.email});
  if (!user) return next(new CreateAppError('Invalid email/password!', 400));

  /** Verify password */
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return next(new CreateAppError('Invalid email/password!', 400));

  /** Generate JWT token */
  const token = user.generateJWT();

  /** Send a successful response */
  res.header('x-auth-token', token).send({
    status: 'success',
    message: 'User logged, JWT token generated',
    data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
  });
}

export const controllers = {
  getAllUsers,
  createNewUser,
  getUser,
  updateUser,
  patchUser,
  deleteUser,
  loginUser,
};
