const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

// Vercel's filesystem is read-only except /tmp, so the DB lives there (ephemeral per instance)
const defaultPath = process.env.VERCEL
  ? '/tmp/payroll.db'
  : path.join(__dirname, '..', 'data', 'payroll.db');
const dbPath = process.env.DB_PATH || defaultPath;

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);

// Create tables and seed sample data if missing
db.exec(fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8'));

module.exports = db;
