import 'dotenv/config';
import express from 'express';
import { log } from './logs/index.js';
import { connectDB } from './startup/connectDB.js';
import { startMiddleware } from './startup/startMiddleware.js';

const app = express();

// Call database initialization
connectDB();

// Call middleware starters
startMiddleware(app);

// ROUTES
// app.use('/api/v1/users', authRouter);
// app.use('/api/v1/tours', usersRouter);

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  log.server(`Server is running on port ${PORT}`);
});
