import mongoose from 'mongoose';
import request from 'supertest';
import { server } from '../server';
import { OrderModel } from '../models/OrderModel';
import { User } from '../models/UserModel';

describe('/api/v2/orders', () => {
  let userId;
  let productId;
  let order;
  let token;

  const executeRequest = () =>
    request(server)
      .post('/api/v2/orders/checkout')
      .set('x-auth-token', token)
      .send(order);

  beforeEach(async () => {
    userId = new mongoose.Types.ObjectId();
    productId = new mongoose.Types.ObjectId();
    order = new OrderModel({
      userId,
      detail: [
        {
          productId,
          productType: 'book',
          name: 'test1',
          price: 1,
        },
      ],
      totalPrice: 1,
      status: 'pending',
    });
    await order.save();
    token = new User({ _id: userId, isAdmin: true }).generateJWT();
  });

  afterEach(async () => {
    await OrderModel.deleteMany({});
    await server.close();
  });

  it('should return 401 if user is not logged', async () => {
    token = '';
    const res = await executeRequest();
    expect(res.status).toBe(401);
  });

  it('should return 400 if userID is not provided', async () => {
    order.userId = '';
    const res = await executeRequest();
    expect(res.status).toBe(400);
  });

  it('should return 400 if productID is not provided', async () => {
    order.detail[0].productId = '';
    const res = await executeRequest();
    expect(res.status).toBe(400);
  });

  it('should return 400 if productType is not provided', async () => {
    order.detail[0].productType = '';
    const res = await executeRequest();
    expect(res.status).toBe(400);
  });

  it('should return 404 if order not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(server)
      .get(`/api/v2/orders/${id}`)
      .set('x-auth-token', token);

    expect(res.status).toBe(404);
  });

  it('should return 200 if order is found', async () => {
    const res = await request(server)
      .get(`/api/v2/orders/${order._id}`)
      .set('x-auth-token', token);

    expect(res.status).toBe(200);
    expect(res.body.order).toHaveProperty('_id', order._id.toString());
  });
});
