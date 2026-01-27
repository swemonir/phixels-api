import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    pricing: { type: Number, required: true },
    demoLink: { type: String },
    images: { type: [String], default: [] },
    category: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware to hide deleted documents
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ProductModel = model<TProduct>('Product', productSchema);
