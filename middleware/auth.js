import bcrypt from 'bcrypt';
import {User} from '../models/UserModel.js';

// TODO: Refactor to check the token validation
/** Checks if password is correct for a given user */
const auth = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(404)
        .send({success: false, message: 'You are not logged in'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .send({success: false, message: 'Incorrect password'});
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
