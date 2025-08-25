const mysql = require('mysql2');
require('dotenv').config();

// Database configuration with AWS Secrets Manager support
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '3306';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'react_node_app';

const db = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  connectTimeout: 10000, // 10 seconds
  acquireTimeout: 10000,
  reconnect: true
});

module.exports = db;
