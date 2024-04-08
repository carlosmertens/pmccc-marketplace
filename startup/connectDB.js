import mongoose from 'mongoose';
import { log } from '../logs/index.js';

export function connectDB() {
  mongoose
    .connect(process.env.COMPASS_URI + process.env.COLLECTION)
    .then(() => log.db('MongoDB connected!'))
    .catch(err => console.log(err));
}
