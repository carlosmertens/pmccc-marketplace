import User from '../models/UserModel.js';
import hashPassword from '../utils/hashPassword.js';

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
      .send({status: 'fail', message: 'You are not an Admin'});
  }
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
  const updatedUser = await User.findById(idForSearch);
  const hashedPass = await hashPassword(updatedUser.password);
  if (!hashedPass)
    return res
      .status(404)
      .send({status: 'fail', message: 'Could not add user. Try again'});
  updatedUser.password = hashedPass;
  await User.findByIdAndUpdate(idForSearch, updatedUser);
  res.status(201).send({status: 'success', message: 'User updated'});
};

/** Deletes a user by id when a valid id is provided*/
export const deleteUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  await User.findByIdAndDelete(idForSearch);
  res.send({status: 'success', message: 'User deleted'});
};

export const ctrlrs = {
  getUsersCtrlr,
  addUsersCtrlr,
  getUserByIdCtrlr,
  updateUserByIdCtrlr,
  deleteUserByIdCtrlr,
};
