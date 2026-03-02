-- Create student_results table to store quiz submissions
CREATE TABLE IF NOT EXISTS student_results (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_student_results_submitted_at ON student_results (submitted_at DESC);
