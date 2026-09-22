const express = require('express');
const db = require('./db');

// Basic Auth credentials (testing only)
const API_USERNAME = 'admin';
const API_PASSWORD = 'admin';

const app = express();
app.use(express.json());

// Basic Auth middleware
function basicAuth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized: Missing or invalid Authorization header'
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = credentials.split(':');

  if (username !== API_USERNAME || password !== API_PASSWORD) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized: Invalid credentials'
    });
  }

  next();
}

// GET /jpayroll/thirdparty/ext/API_View_Master_EmpInfo.php
app.get('/jpayroll/thirdparty/ext/API_View_Master_EmpInfo.php', basicAuth, (req, res) => {
  const { NIK } = req.body;

  if (!NIK) {
    return res.status(400).json({
      status: 'error',
      message: 'NIK is required'
    });
  }

  let data;
  try {
    data = db.prepare('SELECT * FROM master_emp_info WHERE nik = ?').get(NIK);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      detail: error.message
    });
  }

  // Client expects a list of records; an unknown NIK is an empty list, not a 404
  return res.status(200).json({
    status: 'success',
    data: data ? [data] : []
  });
});

// Export for Vercel serverless
module.exports = app;
