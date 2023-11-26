import dotenv from 'dotenv';
dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { signJwt } from '../utils/jwt.utils';
import { app } from './testServer';

const sessionId = new mongoose.Types.ObjectId().toString();
const userId = new mongoose.Types.ObjectId().toString();

export const userData = {
  name: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@gmail.com',
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const exerciseInput = {
  name: 'Bench press',
};

const exercisePayload = {
  ...exerciseInput,
  alternativeNames: expect.any(Array),
  attachments: expect.any(Array),
  instruction: expect.any(Array),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  _id: expect.any(String),
  __v: expect.any(Number),
};

describe('Exercises', () => {
  let accessToken: string;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    accessToken = signJwt({ ...userData, sessionId }, 'accessTokenPrivateKey', {
      expiresIn: '15m',
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('create exercise', () => {
    it('should return a 201 status', async () => {
      const { statusCode, body } = await supertest(app)
        .post('/api/exercises')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          user: userId,
          ...exerciseInput,
        });

      expect(body).toEqual(exercisePayload);
      expect(statusCode).toBe(201);
    });
  });
});
