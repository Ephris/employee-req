import bcrypt from 'bcryptjs';
import { connectDb } from './config/db.js';
import { User } from './modules/auth/auth.model.js';

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'admin123456';

const seed = async () => {
  await connectDb();
  const passwordHash = await bcrypt.hash(password, 10);
  await User.updateOne(
    { username },
    { username, passwordHash, role: 'admin' },
    { upsert: true }
  );
  console.log(`Admin user is ready: ${username}`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

