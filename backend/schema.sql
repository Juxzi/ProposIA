-- PostgreSQL schema for ProposIA backend

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS templates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sections JSONB,
  variables JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  template_id INTEGER REFERENCES templates(id) ON DELETE SET NULL,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
