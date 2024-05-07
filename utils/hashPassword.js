import bcrypt from 'bcrypt';
import {log} from '../logs/index.js';

/**
 * Hashes a plain text password using bcrypt for secure storage.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - Resolves to a promise that resolves with the hashed password on success.
 * @returns {boolean} - Returns false if an error occurs during hashing.
 */
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  } catch (error) {
    log.error(error.message);

    return false;
  }
}
