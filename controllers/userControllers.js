import User from '../models/UserModel.js';

/** displays all users*/
export const getUsersCtrlr = async (req, res) => {
  const result = await User.find();
  if (result.length === 0)
    return res.status(404).send({status: 'fail', message: 'No users found'});
  res.status(200).send(result);
};

/** add user*/
export const addUsersCtrlr = async (req, res) => {
  const newUser = req.body;
  await User.create(newUser);
  res.status(201).send({status: 'success', message: 'User added'});
};

/** get user by id*/
export const getUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findById(idForSearch);
  if (!user)
    return res.status(404).send({status: 'fail', message: 'User not found'});
  res.status(200).json(user);
};

/** update user by id*/
export const updateUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findByIdAndUpdate(idForSearch, req.body);
  if (!user)
    return res.status(404).send({status: 'fail', message: 'User not found'});
  res.status(201).send({status: 'success', message: 'User updated'});
};

/** delete user by id*/
export const deleteUserByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const user = await User.findByIdAndDelete(idForSearch);
  if (!user)
    return res.status(404).send({status: 'fail', message: 'User not found'});
  res.send({status: 'success', message: 'User deleted'});
};

export const ctrlrs = {
  getUsersCtrlr,
  addUsersCtrlr,
  getUserByIdCtrlr,
  updateUserByIdCtrlr,
  deleteUserByIdCtrlr,
};
