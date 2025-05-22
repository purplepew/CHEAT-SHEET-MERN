# Next.js with MongoDB and Mongoose Setup

This section guides you through setting up MongoDB and Mongoose in your Next.js project for database interactions.

## 1. Installation

First, you need to install Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.

```bash
npm install mongoose
# or
yarn add mongoose
```

## 2. Connecting to MongoDB

Create a utility file (e.g., `lib/dbConnect.js` or `utils/db.ts`) to handle your database connection.

```typescript
// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

**Explanation:**
- We retrieve the MongoDB connection string from an environment variable `MONGODB_URI`. **Remember to create a `.env.local` file in your project root and add your `MONGODB_URI` there.**
  Example `.env.local`:
  ```
  MONGODB_URI=your_mongodb_connection_string_here
  ```
- The code includes a caching mechanism for the database connection to optimize performance during development with Next.js hot reloading.
- Basic error handling is included to ensure the `MONGODB_URI` is defined.

## 3. Defining a Mongoose Schema

Schemas define the structure of your documents within a collection. Here's an example of a simple `Product` schema. You would typically define this in a `models/` directory.

```typescript
// models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for this product.'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
```

**Explanation:**
- We define an interface `IProduct` for type safety with TypeScript.
- The `ProductSchema` specifies the fields (`name`, `price`, `description`), their types, and validation rules (e.g., `required`, `maxlength`).
- `timestamps: true` automatically adds `createdAt` and `updatedAt` fields.
- `mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)` handles the model creation, preventing recompilation errors in Next.js development.

## 4. Basic Error Handling for Connection

The `dbConnect.ts` utility already includes a basic check for the `MONGODB_URI`. You can expand error handling within your API routes when you attempt to connect or perform database operations.

```typescript
// Example in an API route
import dbConnect from '../lib/dbConnect'; // Adjust path as needed

export async function GET(request: Request) {
  try {
    await dbConnect();
    // ... your database logic here
    return Response.json({ message: 'Successfully connected to DB' });
  } catch (error) {
    console.error('Database connection error:', error);
    return Response.json({ message: 'Failed to connect to DB' }, { status: 500 });
  }
}
```

This setup provides a solid foundation for using MongoDB with Mongoose in your Next.js eCommerce application.
