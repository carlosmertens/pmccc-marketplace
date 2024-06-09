import bcrypt from 'bcrypt';
import _ from 'lodash';
import { CreateAppError } from '../utils/createAppError.js';
import { validate } from '../validators/index.js';
import { User } from '../models/UserModel.js';

// TODO: Verify with frontend if they are still using this route. Login endpoind belong to users endpoint
async function authUser(req, res, next) {
  const { error } = validate.login(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new CreateAppError('Invalid email/password!', 400));

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return next(new CreateAppError('Invalid email/password!', 400));

  const token = user.generateJWT();

  res.header('x-auth-token', token).send({
    status: 'success',
    message: 'User logged, JWT token generated',
    data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']),
  });
}

export const controllers = { authUser };
