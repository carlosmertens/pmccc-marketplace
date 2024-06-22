import 'dotenv/config';
import { jest } from '@jest/globals';
import { User } from '../../../models/UserModel';
import { auth } from '../../../middleware/auth';
import mongoose from 'mongoose';

describe('auth middleware', () => {
  it('should populate req.user with payload from JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(payload).generateJWT();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);

    expect(req.user).toMatchObject(payload);
  });
});
