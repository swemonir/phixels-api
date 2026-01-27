import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware to hide deleted documents
serviceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ServiceModel = model<TService>('Service', serviceSchema);
