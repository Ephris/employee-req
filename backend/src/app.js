import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { attachRequestId } from './middleware/request-id.js';
import authRoutes from './modules/auth/auth.routes.js';
import healthRoutes from './modules/health/health.routes.js';
import submissionRoutes from './modules/submissions/submission.routes.js';
import uploadRoutes from './modules/uploads/uploads.routes.js';

const globalRateLimit = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
});

const authRateLimit = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: Math.max(20, Math.floor(env.rateLimitMax / 4)),
  standardHeaders: true,
  legacyHeaders: false,
});

export const app = express();

app.use(helmet());
app.use(attachRequestId);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('CORS origin not allowed'));
    },
    credentials: false,
  })
);
app.use(globalRateLimit);
app.use(express.json({ limit: '2mb' }));
app.use(mongoSanitize());
morgan.token('rid', (req) => req.requestId || '-');
app.use(morgan(':method :url :status :response-time ms rid=:rid'));

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRateLimit, authRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/uploads', uploadRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((error, _req, res, _next) => {
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
});

