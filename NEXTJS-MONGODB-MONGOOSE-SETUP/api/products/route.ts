// NEXTJS-MONGODB-MONGOOSE-SETUP/api/products/route.ts
import dbConnect from '../../lib/dbConnect'; // Adjusted relative path
import Product, { IProduct } from '../../models/Product'; // Adjusted relative path
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    // Fetch all products
    const products = await Product.find({});

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    // It's good practice to type your errors if possible
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    // Parse the request body
    const body = await request.json();
    
    // Basic validation (you might want more robust validation)
    if (!body.name || !body.price) {
      return NextResponse.json({ success: false, error: 'Name and price are required' }, { status: 400 });
    }

    // Create a new product
    // Note: The body should conform to IProduct, but without _id, createdAt, updatedAt initially
    const newProductData: Partial<IProduct> = {
      name: body.name,
      price: body.price,
      description: body.description, // Optional
    };

    const product = await Product.create(newProductData);

    return NextResponse.json({ success: true, data: product }, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error creating product:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // Check for Mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
