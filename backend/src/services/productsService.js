import { pool } from '../db/pool.js';

export async function listProducts() {
  const { rows } = await pool.query(
    'SELECT id, name, description, price, size, inventory, image_url, source_attribution, source_url, license FROM products ORDER BY id'
  );
  return rows;
}

export async function getProductById(id) {
  const { rows } = await pool.query(
    'SELECT id, name, description, price, size, inventory, image_url, source_attribution, source_url, license FROM products WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}
