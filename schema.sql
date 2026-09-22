-- SQLite schema. Applied automatically by api/db.js on startup.

-- Create the employee info table
CREATE TABLE IF NOT EXISTS master_emp_info (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nik         TEXT     NOT NULL UNIQUE,
  full_name   TEXT     NOT NULL,
  department  TEXT,
  position    TEXT,
  join_date   TEXT,
  status      TEXT     DEFAULT 'active',
  email       TEXT,
  phone       TEXT,
  company_code TEXT,
  company_name TEXT,
  created_at  TEXT     DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Insert sample data for testing
INSERT OR IGNORE INTO master_emp_info (nik, full_name, department, position, join_date, status, email, phone, company_code, company_name)
VALUES
  ('TTI0001093', 'John Doe',      'Engineering',  'Senior Developer',  '2021-03-15', 'active', 'john.doe@company.com',    '081234567890', 'TTI', 'PT Sample Company'),
  ('TTI0001094', 'Jane Smith',    'HR',            'HR Manager',        '2020-07-01', 'active', 'jane.smith@company.com',  '081234567891', 'TTI', 'PT Sample Company'),
  ('TTI0001095', 'Ahmad Rizki',   'Finance',       'Accountant',        '2022-01-10', 'active', 'ahmad.rizki@company.com', '081234567892', 'TTS', 'PT Sample Subsidiary');
