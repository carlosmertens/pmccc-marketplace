import _ from 'lodash';
import bcrypt from 'bcrypt';
import { User } from '../models/UserModel.js';
import { validate } from '../validators/index.js';
import { hashPassword } from '../utils/hashPassword.js';
import { CreateAppError } from '../utils/createAppError.js';
import { processQuery } from '../utils/processQuery.js';

/** (GET REQUEST) */
export const getAllUsers = async (req, res) => {
  const query = processQuery(req.query, User);
  const users = await query;

  res.send({
    status: 'success',
    message: 'GET request to get all users was successful',
    result: users.length,
    users,
  });
};

/** (POST REQUEST) */
async function createUser(req, res, next) {
  const { error } = validate.createUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  let user = await User.findOne({ email: req.body.email });
  if (user) return next(new CreateAppError('User already exists!', 400));

  user = new User(req.body);

  user.password = await hashPassword(user.password, next);

  await user.save();

  const token = user.generateJWT();

  res
    .status(201)
    .header('x-auth-token', token)
    .send({
      message: 'PMCCC Marketplace API',
      status: 'success',
      user: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
    });
}

/** (GET REQUEST) */
async function getUser(req, res, next) {
  const user = await User.findById(req.user._id).select(
    '-__v -createdAt -updatedAt -password'
  );
  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    user,
  });
}

/** (PUT REQUEST) */
async function updateUser(req, res, next) {
  const { error } = validate.createUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  req.body.password = await hashPassword(req.body.password, next);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
    new: true,
  }).select('-__v -createdAt -updatedAt -password');
  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    user,
  });
}

/** (PATCH REQUEST) */
async function patchUser(req, res, next) {
  const { error } = validate.patchUser(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  if (req.body.password)
    req.body.password = await hashPassword(req.body.password, next);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  }).select('-__v -createdAt -updatedAt -password');

  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    user,
  });
}

/** (DELETE REQUEST) */
async function deleteUser(req, res, next) {
  const user = await User.findByIdAndDelete(req.user._id, { new: true });
  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    user: _.pick(user, ['_id', 'firstName', 'lastName', 'email']),
  });
}

/** (POST REQUEST) */
async function loginUser(req, res, next) {
  const { error } = validate.login(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new CreateAppError('Invalid email/password!', 400));

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return next(new CreateAppError('Invalid email/password!', 400));

  const token = user.generateJWT();

  res.header('x-auth-token', token).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
  });
}

// (GET REQUEST)
async function getNewsletter(req, res, next) {
  const user = await User.findById(req.user._id).select('newsletter');
  if (!user) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    user,
  });
}

export const controllers = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  patchUser,
  deleteUser,
  loginUser,
  getNewsletter,
};
