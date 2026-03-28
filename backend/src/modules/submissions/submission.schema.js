import { z } from 'zod';

export const createSubmissionSchema = z.object({
  formType: z.enum(['life_history', 'social_security']),
  submittedBy: z.string().max(200).optional().default(''),
  data: z.record(z.any()),
});

export const updateSubmissionStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'reviewed']),
  reviewNote: z.string().max(1000).optional().default(''),
});

