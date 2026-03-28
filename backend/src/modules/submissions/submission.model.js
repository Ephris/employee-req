import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    formType: { type: String, enum: ['life_history', 'social_security'], required: true, index: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'reviewed'], default: 'pending', index: true },
    submittedBy: { type: String, default: '' },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    reviewedBy: { type: String, default: '' },
    reviewNote: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Submission = mongoose.model('Submission', submissionSchema);

