import 'dotenv/config';
import bcrypt from 'bcrypt';
import {log} from '../logs/index.js';

/** This function returns a hashed password from a plain text one
 * @param password the plain text password
 */
const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
  } catch (error) {
    log.error(error.message);
    return false;
  }
};

export default hashPassword;
