import bcrypt from 'bcrypt';

export async function hashPassword(password, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  } catch (error) {
    return next(new CreateAppError('Hash error. Try again!', 404));
  }
}
