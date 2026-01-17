import bcrypt from 'bcrypt';
import { pool } from '../db/pool.js';
import { config } from '../config.js';

export async function registerUser({ displayName, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const role = email.toLowerCase() === config.adminEmail.toLowerCase() ? 'admin' : 'user';
  const { rows } = await pool.query(
    `INSERT INTO users (display_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, display_name, email, role`,
    [displayName, email, passwordHash, role]
  );
  return rows[0];
}

export async function authenticateUser({ email, password }) {
  const { rows } = await pool.query(
    'SELECT id, display_name, email, role, password_hash FROM users WHERE email = $1',
    [email]
  );
  const user = rows[0];
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return null;
  return {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    role: user.role
  };
}

export async function getUserById(id) {
  const { rows } = await pool.query(
    'SELECT id, display_name, email, role FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}
