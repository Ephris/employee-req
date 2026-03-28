import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './auth.model.js';
import { validateBody } from '../../middleware/validate.js';
import { requireAuth } from '../../middleware/auth.js';
import { loginSchema } from './auth.schema.js';
import { env } from '../../config/env.js';

const router = express.Router();

router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { username, password } = req.validatedBody;
  let user = await User.findOne({ username }).lean();

  // Developer bootstrap: if no users exist yet, create the first admin from submitted credentials.
  if (!user) {
    const userCount = await User.countDocuments({});
    if (userCount === 0 && env.nodeEnv !== 'production') {
      const passwordHash = await bcrypt.hash(password, 10);
      const createdUser = await User.create({ username, passwordHash, role: 'admin' });
      user = {
        _id: createdUser._id,
        username: createdUser.username,
        passwordHash,
        role: createdUser.role,
      };
    }
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { sub: String(user._id), username: user.username, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return res.json({ token, user: { username: user.username, role: user.role } });
});

router.get('/me', requireAuth, (req, res) => {
  return res.json({
    user: {
      id: req.user?.sub,
      username: req.user?.username,
      role: req.user?.role,
    },
  });
});

export default router;

