import User from '../models/UserModel.js';
import hashPassword from '../utils/hashPassword.js';

/** Returns a list of all users*/
export const getUsersCtrlr = async (req, res) => {
  const result = await User.find();
  if (result.length === 0)
    return res.status(404).send({status: 'fail', message: 'No users found'});
  res.status(200).send(result);
};

/** Adds user with hashed password*/
export const addUsersCtrlr = async (req, res) => {
  const newUser = req.body;
  const hashedPass = await hashPassword(newUser.password);
  if (!hashedPass)
    return res
      .status(404)
      .send({status: 'fail', message: 'Could not add user. Try again'});
  newUser.password = hashedPass;
  await User.create(newUser);
  res.status(201).send({status: 'success', message: 'User added'});
};

/** Finds and returns a user by id*/
export const getUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findById(idForSearch);
  // If id is incorrect, handled by error handling
  res.status(200).json(user);
};

/** Finds and updates a user by id*/
export const updateUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findByIdAndUpdate(idForSearch, req.body);
  // If id is incorrect, handled by error handling
  res.status(201).send({status: 'success', message: 'User updated'});
};

/** Deletes a user by id*/
export const deleteUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findByIdAndDelete(idForSearch);
  // If id is incorrect, handled by error handling
  res.send({status: 'success', message: 'User deleted'});
};

export const ctrlrs = {
  getUsersCtrlr,
  addUsersCtrlr,
  getUserByIdCtrlr,
  updateUserByIdCtrlr,
  deleteUserByIdCtrlr,
};
