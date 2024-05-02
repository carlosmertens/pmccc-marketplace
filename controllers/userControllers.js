import bcrypt from 'bcrypt';
import {User, validateSignUp, validateLogin} from '../models/UserModel.js';
import hashPassword from '../utils/hashPassword.js';
import {CreateAppError} from '../utils/createAppError.js';

/** Returns a list of all users to an Admin*/
export const getUsersCtrlr = async (req, res) => {
  const {email} = req.body;
  const queryType = req.query.sort;
  const user = await User.findOne({email});
  let result;
  if (user.isAdmin === true) {
    result =
      queryType === 'date'
        ? await User.find().sort({date: -1})
        : await User.find().sort({lastName: 1});

    if (result.length === 0)
      return res.status(404).send({status: 'fail', message: 'No users found'});
    res.status(200).send(result);
  } else {
    return res
      .status(403)
      .send({status: 'fail', message: 'You are not an Admin!'});
  }
};

/**
 * Create (POST REQUEST) a new user in the database
 * Response a JWT token on success
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function createNewUser(req, res, next) {
  /** Validate data with Joi validation function */
  const {error} = validateSignUp(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  /** Find user in the database */
  let user = await User.findOne({email: req.body.email});
  if (user) return next(new CreateAppError('User already exists!', 400));

  /** Create new user and hash the password with hashPassword util function */
  user = new User(req.body);
  const hashedPass = await hashPassword(user.password);
  if (!hashedPass)
    return next(new CreateAppError('Password not generated. Try again!', 404));

  user.password = hashedPass;

  /** Save new user in the database */
  await User.create(user);

  /** Generate JWT token */
  const token = user.generateJWT();

  /** Send a successful response with token attached to the header */
  res.status(201).header('x-auth-token', token).send({
    status: 'success',
    message: 'User added in the database!',
    xAuthToken: token,
  });
}

/**
 * Login (POST REQUEST) a user
 * Response a JWT token on success
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next object function
 */
async function loginUser(req, res, next) {
  /** Validate data with Joi function */
  const {error} = validateLogin(req.body);
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
    xAuthToken: token,
  });
}

/** Finds and returns a user by id when a valid id is provided*/
export const getUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findById(idForSearch).select({
    firstName: 1,
    lastName: 1,
    email: 1,
  });
  // If id is incorrect, handled by error handling
  res.status(200).json(user);
};

/** Finds and updates a user by id when a valid id is provided*/
export const updateUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const newUser = req.body;
  const hashedPass = await hashPassword(newUser.password);
  if (!hashedPass)
    return res
      .status(404)
      .send({status: 'fail', message: 'Could not add user. Try again'});
  newUser.password = hashedPass;
  await User.findByIdAndUpdate(idForSearch, newUser);
  res.status(201).send({status: 'success', message: 'User updated'});
};

/** Deletes a user by id when a valid id is provided*/
export const deleteUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  await User.findByIdAndDelete(idForSearch);
  res.send({status: 'success', message: 'User deleted'});
};

export const controllers = {
  getUsersCtrlr,
  createNewUser,
  getUserByIdCtrlr,
  updateUserByIdCtrlr,
  deleteUserByIdCtrlr,
  loginUser,
};
