import 'dotenv/config';
import express from 'express';
import { log } from './logs/index.js';
import { connectDB } from './startup/connectDB.js';
import { startMiddleware } from './startup/startMiddleware.js';
import { toursRouter } from './routes/toursRouter.js';
// import { startRoutes } from './startup/startRoutes.js';

const app = express();

// Call database initialization
connectDB();

// Call middleware starters
startMiddleware(app);

// ROUTES
app.use('/api/v1/tours', toursRouter);
// startRoutes();

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  log.server(`Server is running on port ${PORT}`);
});
