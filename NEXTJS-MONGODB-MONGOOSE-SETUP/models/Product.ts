// NEXTJS-MONGODB-MONGOOSE-SETUP/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  // createdAt and updatedAt are automatically added by timestamps
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
      trim: true, // Good practice to trim whitespace
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for this product.'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Prevent model overwrite errors during Next.js hot reloading
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
