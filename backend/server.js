// Node Imports
import express from 'express';
import path from 'path';

// Cors Module for Cross-Origin Protection
import cors from 'cors';

// Environment Variables Module Import
import dotenv from 'dotenv';

// Custom Modules
// Error Handler Module
import errorHandler from './controllers/errorController.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

// dbConnection Module
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Connect DB Function
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Connection ENV
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Connection Response
/* 
PORT Variable should be inside the .env file
(e.g. PORT = 8080)
*/
let port = process.env.PORT;

app.listen(port || 5000, () => {
  console.log(`Server is running on ${process.env.NODE_ENV} on port ${port}`);

  // 404 ErrorHandler
  app.all('*', (req, res, next) => {
    throw new Error(`Unable to locate ${req.originalUrl} on this server `, 404);
  });

  app.use(errorHandler);
});
