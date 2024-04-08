import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { log } from './logs/index.js';
import { connectDB } from './startup/connectDB.js';

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));
app.use(cors());

// app.use('/api/v1/users', authRouter);
// app.use('/api/v1/tours', usersRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  log.server(`Server is running on port ${PORT}`);
});
