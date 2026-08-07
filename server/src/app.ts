import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';

import { authRouter } from './routes/auth';
import { videoRouter } from './routes/video';
import { paymentsRouter } from './routes/payments';
import { callsRouter } from './routes/calls';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));

// Webhook needs raw body, so we conditionally apply JSON parser
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/payments/webhook')) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/video', videoRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/calls', callsRouter);

// Global Error Handler
app.use(errorHandler);
