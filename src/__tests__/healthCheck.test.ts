import supertest from 'supertest';
import { app } from './testServer';

describe('healthCheck', () => {
  it('should return status 200', async () => {
    await supertest(app).get('/api/healthCheck').expect(200);
  });
});
