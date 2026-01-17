import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { listAllOrders } from '../services/ordersService.js';

export const adminRouter = Router();

adminRouter.get('/orders', requireAuth, adminOnly, async (req, res, next) => {
  try {
    const orders = await listAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
