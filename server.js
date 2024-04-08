import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { logs } from './logs/index.js';

const app = express();

mongoose
  .connect(process.env.COMPASS_URI + process.env.DB_NAME)
  .then(() => logs.db('MongoDB connected!'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));
app.use(cors());

// app.use('/api/v1/users', authRouter);
// app.use('/api/v1/tours', usersRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  logs.server(`Server is running on port ${PORT}`);
});
