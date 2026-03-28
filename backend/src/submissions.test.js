import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from './app.js';
import { env } from './config/env.js';
import { Submission } from './modules/submissions/submission.model.js';

const createAdminToken = () =>
  jwt.sign({ sub: 'test-user', username: 'admin', role: 'admin' }, env.jwtSecret, {
    expiresIn: '5m',
  });

test('GET /api/submissions requires auth', async () => {
  const response = await request(app).get('/api/submissions');
  assert.equal(response.status, 401);
});

test('GET /api/submissions returns list for admin', async () => {
  const originalFind = Submission.find;
  const originalCountDocuments = Submission.countDocuments;

  try {
    Submission.find = () => ({
      sort: () => ({
        skip: () => ({
          limit: async () => [
            {
              _id: '507f1f77bcf86cd799439011',
              formType: 'life_history',
              status: 'pending',
              submittedBy: 'Test User',
              data: {},
              reviewNote: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        }),
      }),
    });

    Submission.countDocuments = async () => 1;

    const response = await request(app)
      .get('/api/submissions')
      .set('Authorization', `Bearer ${createAdminToken()}`);

    assert.equal(response.status, 200);
    assert.equal(Array.isArray(response.body.items), true);
    assert.equal(response.body.total, 1);
  } finally {
    Submission.find = originalFind;
    Submission.countDocuments = originalCountDocuments;
  }
});

