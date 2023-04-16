import mongoose from 'mongoose';
import { logger } from './logger';

const dbUri = process.env.DB_CONNECTION as string;

mongoose.set('strictQuery', false);

export async function connectToDb() {
  try {
    await mongoose.connect(dbUri);
    logger.info('Db connected');
  } catch (error) {
    console.log('Could not connect to db');
    logger.error(error);
    process.exit(1);
  }
}
