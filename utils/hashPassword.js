import bcrypt from 'bcrypt';

/**
 * Hashes a plain text password using bcrypt for secure storage.
 * @param {string} password - The plain text password to be hashed.
 */
export async function hashPassword(password, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  } catch (error) {
    return next(new CreateAppError('Hash error. Try again!', 404));
  }
}
