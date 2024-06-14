import { User } from '../../../models/UserModel';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import mongoose from 'mongoose';

describe('user.generateJWT', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateJWT();
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    expect(decoded).toMatchObject(payload);
  });
});
