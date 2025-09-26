import express from 'express';
import task from './modules/task/index.js';
import auth from './modules/auth/index.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/task', task);
app.use('/auth', auth);

// Error handling middleware
app.use(errorHandler);

export default app;
