import { app } from './app.js';
import { env } from './config/env.js';
import { connectDb } from './config/db.js';

const boot = async () => {
  app.listen(env.port, async () => {
    console.log(`API running at http://localhost:${env.port}`);
    try {
      await connectDb();
      console.log('MongoDB connected');
    } catch (error) {
      console.warn('MongoDB connection failed; API is running with limited functionality');
      console.warn(error instanceof Error ? error.message : String(error));
    }
  });
};

boot().catch((error) => {
  console.error('Server startup failed', error);
  process.exit(1);
});

