import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { sessionMiddleware } from './middleware/session.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(sessionMiddleware);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`API listening on ${config.port}`);
});
