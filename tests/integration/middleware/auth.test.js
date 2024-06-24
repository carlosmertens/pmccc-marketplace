import request from 'supertest';
import { server } from '../../../server.js';
import { User } from '../../../models/UserModel.js';
import { BookModel } from '../../../models/BookModel.js';

const bookTest = {
  name: 'test1',
  author: 'test1',
  genre: 'test1',
  pages: 1,
  description: 'Some test and should pass all validation tests',
  price: 1,
};

describe('auth middleware', () => {
  afterEach(async () => {
    await BookModel.deleteMany({});
    await server.close();
  });

  let xAuthToken;
  const exec = () => {
    return request(server)
      .post('/api/v2/books')
      .set('x-auth-token', xAuthToken)
      .send(bookTest);
  };

  it('should return 401 if user is not logged', async () => {
    xAuthToken = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    xAuthToken = '1234';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    xAuthToken = new User({ isAdmin: true }).generateJWT();
    const res = await exec();
    expect(res.status).toBe(201);
  });
});
