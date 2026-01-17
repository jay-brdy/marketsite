import bcrypt from 'bcrypt';
import { pool } from '../db/pool.js';
import { config } from '../config.js';

export async function registerUser({ displayName, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const role = email.toLowerCase() === config.adminEmail.toLowerCase() ? 'admin' : 'user';
  const { rows } = await pool.query(
    `INSERT INTO users (display_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, display_name, email, role, birthday`,
    [displayName, email, passwordHash, role]
  );
  const user = rows[0];
  return {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    role: user.role,
    birthday: user.birthday
  };
}

export async function authenticateUser({ email, password }) {
  const { rows } = await pool.query(
    'SELECT id, display_name, email, role, password_hash, birthday FROM users WHERE email = $1',
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
    role: user.role,
    birthday: user.birthday
  };
}

export async function getUserById(id) {
  const { rows } = await pool.query(
    'SELECT id, display_name, email, role, birthday FROM users WHERE id = $1',
    [id]
  );
  const user = rows[0];
  if (!user) return null;
  return {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    role: user.role,
    birthday: user.birthday
  };
}

export async function updateUserProfile(id, { displayName, birthday }) {
  const { rows } = await pool.query(
    `UPDATE users
     SET display_name = COALESCE($1, display_name),
         birthday = COALESCE($2, birthday)
     WHERE id = $3
     RETURNING id, display_name, email, role, birthday`,
    [displayName ?? null, birthday ?? null, id]
  );
  const user = rows[0];
  return {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    role: user.role,
    birthday: user.birthday
  };
}
