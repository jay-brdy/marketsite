import { Router } from 'express';
import { listFaqs } from '../services/faqService.js';

export const faqRouter = Router();

faqRouter.get('/', async (req, res, next) => {
  try {
    const faqs = await listFaqs();
    res.json(faqs);
  } catch (err) {
    next(err);
  }
});
