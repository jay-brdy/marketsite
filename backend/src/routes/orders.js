import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createOrderFromCart, getOrderById, listOrdersForUser } from '../services/ordersService.js';

export const ordersRouter = Router();

ordersRouter.get('/', requireAuth, async (req, res, next) => {
  try {
    const orders = await listOrdersForUser(req.session.userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

ordersRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const orderId = await createOrderFromCart(req.session.userId);
    const order = await getOrderById(orderId);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});
