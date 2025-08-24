const request = require('supertest');

// Mock the database module before importing app
jest.mock('../configs/db', () => ({
  connect: jest.fn((callback) => callback()),
  query: jest.fn((sql, params, callback) => {
    if (typeof params === 'function') {
      // If params is actually the callback (no params provided)
      params(null, []);
    } else {
      // Normal query with params
      callback(null, []);
    }
  }),
}));

const app = require('../app');

describe('API Health Check', () => {
  test('GET /health should return success', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});

describe('Books API', () => {
  test('GET /api/books should return books array', async () => {
    const response = await request(app)
      .get('/api/books')
      .expect(200);

    expect(response.body).toHaveProperty('books');
    expect(Array.isArray(response.body.books)).toBe(true);
  });
});

describe('Authors API', () => {
  test('GET /api/authors should return authors array', async () => {
    const response = await request(app)
      .get('/api/authors')
      .expect(200);

    expect(response.body).toHaveProperty('authors');
    expect(Array.isArray(response.body.authors)).toBe(true);
  });
});

