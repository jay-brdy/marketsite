import { pool } from '../db/pool.js';

export async function getCartByUserId(userId) {
  const cartResult = await pool.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
  let cartId = cartResult.rows[0]?.id;
  if (!cartId) {
    const created = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [userId]);
    cartId = created.rows[0].id;
  }
  const items = await pool.query(
    `SELECT ci.product_id, ci.quantity, p.name, p.price
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = $1`,
    [cartId]
  );
  return { id: cartId, userId, items: items.rows };
}

export async function addCartItem(userId, productId, quantity) {
  const cart = await getCartByUserId(userId);
  await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (cart_id, product_id)
     DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
    [cart.id, productId, quantity]
  );
  return getCartByUserId(userId);
}

export async function updateCartItem(userId, productId, quantity) {
  const cart = await getCartByUserId(userId);
  if (quantity <= 0) {
    await pool.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart.id, productId]);
  } else {
    await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3',
      [quantity, cart.id, productId]
    );
  }
  return getCartByUserId(userId);
}
