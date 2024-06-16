import mongoose from 'mongoose';
import { log } from '../logs/index.js';

export function connectDB() {
  const db =
    process.env.NODE_ENV === 'test'
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME;

  mongoose
    .connect(process.env.COMPASS_URI + db)
    .then(() => log.db(`MongoDB connected to ${db} database!`))
    .catch(err => console.log(err));
}
