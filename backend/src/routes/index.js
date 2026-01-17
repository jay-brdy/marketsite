import { Router } from 'express';
import { productsRouter } from './products.js';
import { faqRouter } from './faqs.js';
import { authRouter } from './auth.js';
import { cartRouter } from './cart.js';
import { ordersRouter } from './orders.js';
import { adminRouter } from './admin.js';

export const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/faqs', faqRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/admin', adminRouter);
