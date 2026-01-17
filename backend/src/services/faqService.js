import { pool } from '../db/pool.js';

export async function listFaqs() {
  const { rows } = await pool.query('SELECT id, question, answer FROM faqs ORDER BY id');
  return rows;
}
