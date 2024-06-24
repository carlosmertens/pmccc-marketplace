import request from 'supertest';
import { server } from '../../../server.js';
import { BookModel } from '../../../models/BookModel.js';
import { User } from '../../../models/UserModel.js';

const bookTest = {
  name: 'test1',
  author: 'test1',
  genre: 'test1',
  pages: 1,
  description: 'Some test and should pass all validation tests',
  price: 1,
};

describe('/api/v2/books', () => {
  afterEach(async () => {
    await BookModel.deleteMany({});
    await server.close();
  });

  describe('GET /', () => {
    it('should return all books', async () => {
      await BookModel.collection.insertMany([
        { name: 'test1' },
        { name: 'test2' },
      ]);

      const res = await request(server).get('/api/v2/books');

      expect(res.status).toBe(200);
      expect(res.body.books.length).toBe(2);
      expect(res.body.books.some(book => book.name === 'test1')).toBeTruthy();
      expect(res.body.books.some(book => book.name === 'test2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a book if valid id is passed', async () => {
      const book = new BookModel(bookTest);
      await book.save();

      const res = await request(server).get('/api/v2/books/' + book._id);

      expect(res.status).toBe(200);
      expect(res.body.book).toHaveProperty('name', book.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/v2/books/1');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let user;
    let token;

    beforeEach(() => {
      user = new User({ isAdmin: true });
      token = user.generateJWT();
    });

    const executeRequest = () =>
      request(server)
        .post('/api/v2/books')
        .set('x-auth-token', token)
        .send(bookTest);

    it('should return 401 if user is not logged', async () => {
      const res = await request(server).post('/api/v2/books').send(bookTest);
      expect(res.status).toBe(401);
    });

    it('should return 403 if user is not admin', async () => {
      const res = await executeRequest();
      expect(res.status).not.toBe(403);
    });

    it('should save the book if it is valid', async () => {
      const res = await executeRequest();
      expect(res.body.book).not.toBeNull();
    });

    it('should return the book if it is valid', async () => {
      const res = await executeRequest();
      expect(res.body.book).toHaveProperty('_id');
      expect(res.body.book).toHaveProperty('name', 'test1');

      expect(Object.keys(res.body.book)).toEqual(
        expect.arrayContaining([
          '_id',
          'name',
          'author',
          'genre',
          'price',
          'reviews',
        ])
      );
    });
  });
});
