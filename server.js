import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));
app.use(cors());

// app.use('/api/v1/users', authRouter);
// app.use('/api/v1/tours', usersRouter);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
