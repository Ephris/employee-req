import express from 'express';
import { Submission } from './submission.model.js';
import { validateBody } from '../../middleware/validate.js';
import { createSubmissionSchema, updateSubmissionStatusSchema } from './submission.schema.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

const router = express.Router();

router.post('/', validateBody(createSubmissionSchema), async (req, res) => {
  const created = await Submission.create({
    formType: req.validatedBody.formType,
    submittedBy: req.validatedBody.submittedBy || '',
    data: req.validatedBody.data,
  });

  return res.status(201).json({
    id: String(created._id),
    status: created.status,
    createdAt: created.createdAt,
  });
});

router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  const { status, formType, q = '', page = 1, pageSize = 20 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (formType) filter.formType = formType;
  if (q) filter.submittedBy = { $regex: q, $options: 'i' };

  const pageNumber = Math.max(1, Number(page));
  const limit = Math.min(100, Math.max(1, Number(pageSize)));
  const skip = (pageNumber - 1) * limit;

  const [items, total] = await Promise.all([
    Submission.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Submission.countDocuments(filter),
  ]);

  return res.json({
    items: items.map((item) => ({
      id: String(item._id),
      formType: item.formType,
      status: item.status,
      submittedBy: item.submittedBy,
      data: item.data,
      reviewNote: item.reviewNote,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
    total,
    page: pageNumber,
    pageSize: limit,
  });
});

router.patch('/:id/status', requireAuth, requireRole('admin'), validateBody(updateSubmissionStatusSchema), async (req, res) => {
  const updated = await Submission.findByIdAndUpdate(
    req.params.id,
    {
      status: req.validatedBody.status,
      reviewNote: req.validatedBody.reviewNote || '',
      reviewedBy: req.user?.username || 'admin',
    },
    { new: true }
  ).lean();

  if (!updated) {
    return res.status(404).json({ message: 'Submission not found' });
  }

  return res.json({
    id: String(updated._id),
    status: updated.status,
    reviewNote: updated.reviewNote,
    updatedAt: updated.updatedAt,
  });
});

export default router;

