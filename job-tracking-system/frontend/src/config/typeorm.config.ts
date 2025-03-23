import { createConnection, ConnectionOptions } from 'typeorm';
import { User } from '../entities/User.entity';
import { JobApplication } from '../entities/JobApplication.entity';
import { Resume } from '../entities/Resume.entity';
import { Notification } from '../entities/Notification.entity';

// This is a development configuration - for production use environment variables
const config: ConnectionOptions = {
  type: 'mysql', // Change to your preferred database
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'job_tracker',
  entities: [User, JobApplication, Resume, Notification],
  synchronize: true, // Set to false in production
  logging: true,
};

// Initialize the connection
createConnection(config)
  .then(() => {
    console.log('Database connection has been established!');
  })
  .catch((err) => {
    console.error('Error during database connection', err);
  }); 