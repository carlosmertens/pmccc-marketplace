import Joi from 'joi';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import {CreateAppError} from '../utils/createAppError.js';
import {User} from '../models/UserModel.js';

async function authUser(req, res, next) {
  /** Validate login data with Joi validate function */
  const {error} = validate(req.body);
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

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email().trim().min(5).max(255),
    password: Joi.string().required().trim().min(5).max(32),
  });

  return schema.validate(req);
}

export const controllers = {authUser};
