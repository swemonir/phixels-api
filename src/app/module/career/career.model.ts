import { Schema, model } from 'mongoose';
import { TCareer } from './career.interface';

const careerSchema = new Schema<TCareer>(
  {
    jobTitle: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'],
      required: true,
    },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    salaryRange: { type: String },
    deadline: { type: Date },
    applicationLink: { type: String },
    applicationEmail: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware to hide deleted documents
careerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

careerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const CareerModel = model<TCareer>('Career', careerSchema);
