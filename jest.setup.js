// Jest setup file for backend tests
// This file runs before each test

// Setup test environment
process.env.NODE_ENV = 'test';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_NAME = 'test_db';

// Mock database connection for tests
jest.mock('./configs/db', () => ({
  connect: jest.fn((callback) => callback()),
  query: jest.fn((sql, params, callback) => {
    if (typeof params === 'function') {
      params(null, []);
    } else {
      callback(null, []);
    }
  }),
}));

// Increase timeout for database operations
jest.setTimeout(30000);

