import { pool } from '../db/pool.js';

export async function listOrdersForUser(userId) {
  const { rows } = await pool.query(
    `SELECT id, status, payment_status, created_at, total
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

export async function listAllOrders() {
  const { rows } = await pool.query(
    `SELECT id, user_id, status, payment_status, created_at, total
     FROM orders
     ORDER BY created_at DESC`
  );
  return rows;
}

export async function createOrderFromCart(userId) {
  const cartRes = await pool.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
  const cartId = cartRes.rows[0]?.id;
  if (!cartId) throw Object.assign(new Error('Cart not found'), { status: 400 });

  const itemsRes = await pool.query(
    `SELECT ci.product_id, ci.quantity, p.price
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = $1`,
    [cartId]
  );
  if (!itemsRes.rows.length) throw Object.assign(new Error('Cart is empty'), { status: 400 });

  const total = itemsRes.rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderRes = await pool.query(
    `INSERT INTO orders (user_id, total, status, payment_status)
     VALUES ($1, $2, 'placed', 'mocked')
     RETURNING id`,
    [userId, total]
  );
  const orderId = orderRes.rows[0].id;

  const insertValues = itemsRes.rows
    .map(
      (item, index) => `($1, $${index * 3 + 2}, $${index * 3 + 3}, $${index * 3 + 4})`
    )
    .join(', ');
  const params = [orderId];
  itemsRes.rows.forEach((item) => {
    params.push(item.product_id, item.quantity, item.price);
  });

  await pool.query(
    `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
     VALUES ${insertValues}`,
    params
  );

  await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

  return orderId;
}

export async function getOrderById(orderId) {
  const { rows } = await pool.query(
    `SELECT id, user_id, status, payment_status, created_at, total
     FROM orders
     WHERE id = $1`,
    [orderId]
  );
  return rows[0] || null;
}
