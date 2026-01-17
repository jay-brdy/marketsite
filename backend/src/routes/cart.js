import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { addCartItem, getCartByUserId, updateCartItem } from '../services/cartService.js';

export const cartRouter = Router();

cartRouter.get('/', requireAuth, async (req, res, next) => {
  try {
    const cart = await getCartByUserId(req.session.userId);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.post('/items', requireAuth, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) return res.status(400).json({ error: 'Missing fields' });
    const cart = await addCartItem(req.session.userId, productId, quantity);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.patch('/items/:productId', requireAuth, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined) return res.status(400).json({ error: 'Missing quantity' });
    const cart = await updateCartItem(req.session.userId, req.params.productId, quantity);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.delete('/items/:productId', requireAuth, async (req, res, next) => {
  try {
    const cart = await updateCartItem(req.session.userId, req.params.productId, 0);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
