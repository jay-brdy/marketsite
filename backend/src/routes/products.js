import { Router } from 'express';
import { listProducts, getProductById } from '../services/productsService.js';

export const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});
