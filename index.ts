import { Task } from './src/tasks/tasks.entity';
import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { tasksRouter } from './src/tasks/tasks.router';

// Create a new express application instance
const app: Express = express();

// Load environment variables
dotenv.config();

// Parse request body
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: true,
});

// The port the express app will listen on
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('Database Connection Initialized');
  })
  .catch((error) => {
    console.log('Database Connection Error', error);
  });

// Add routes
app.use('/', tasksRouter); // Add tasks as a default route
