import dotenv from 'dotenv';

dotenv.config();

const required = ['DATABASE_URL', 'SESSION_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.warn(`Missing env vars: ${missing.join(', ')}`);
}

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  databaseUrl: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com'
};
