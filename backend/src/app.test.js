import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from './app.js';

test('GET /api/health returns ok payload', async () => {
  const response = await request(app).get('/api/health');
  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.ok(response.body.timestamp);
});

test('GET /api/unknown returns 404', async () => {
  const response = await request(app).get('/api/unknown');
  assert.equal(response.status, 404);
  assert.equal(response.body.message, 'Not found');
});

