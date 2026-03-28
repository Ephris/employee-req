import express from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { env } from '../../config/env.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

const uploadDir = path.resolve(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeExt = path.extname(file.originalname).toLowerCase().replace(/[^.\w]/g, '');
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: env.uploadMaxMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed'));
      return;
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post('/image', requireAuth, requireRole('admin'), upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File missing' });
  }

  return res.status(201).json({
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

export default router;

