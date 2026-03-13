-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard -> Your Project -> SQL Editor

-- Create the employee info table
CREATE TABLE IF NOT EXISTS master_emp_info (
  id          SERIAL PRIMARY KEY,
  nik         VARCHAR(20)   NOT NULL UNIQUE,
  full_name   VARCHAR(100)  NOT NULL,
  department  VARCHAR(100),
  position    VARCHAR(100),
  join_date   DATE,
  status      VARCHAR(20)   DEFAULT 'active',
  email       VARCHAR(100),
  phone       VARCHAR(20),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for testing
INSERT INTO master_emp_info (nik, full_name, department, position, join_date, status, email, phone)
VALUES
  ('TTI0001093', 'John Doe',      'Engineering',  'Senior Developer',  '2021-03-15', 'active', 'john.doe@company.com',    '081234567890'),
  ('TTI0001094', 'Jane Smith',    'HR',            'HR Manager',        '2020-07-01', 'active', 'jane.smith@company.com',  '081234567891'),
  ('TTI0001095', 'Ahmad Rizki',   'Finance',       'Accountant',        '2022-01-10', 'active', 'ahmad.rizki@company.com', '081234567892')
ON CONFLICT (nik) DO NOTHING;
