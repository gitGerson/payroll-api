require('dotenv').config();
const express = require('express');
const db = require('./db');

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

  if (username !== process.env.API_USERNAME || password !== process.env.API_PASSWORD) {
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

  if (!data) {
    return res.status(404).json({
      status: 'error',
      message: `Employee with NIK '${NIK}' not found`
    });
  }

  return res.status(200).json({
    status: 'success',
    data: data
  });
});

// Export for Vercel serverless
module.exports = app;
