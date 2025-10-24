import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';

export async function GET() {
  try {
    console.log('Fetching movies...');
    
    const { db } = await connectToDatabase();
    const collection = db.collection('movies_test');

    const movies = await collection.find({}).limit(10).toArray();
    console.log('Fetched movies:', movies.length);

    return NextResponse.json({
      message: "Movies from sample_mflix",
      data: movies
    });

  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: `Failed to fetch movies: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Starting to add movie...');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { title, year, plot, poster } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    const { db } = await connectToDatabase();
    const collection = db.collection('movies_test');

    const newMovie = {
      title,
      year: year || null,
      plot: plot || null,
      poster: poster || null,
      createdAt: new Date()
    };

    console.log('Inserting movie:', newMovie);
    const result = await collection.insertOne(newMovie);
    console.log('Insert result:', result);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...newMovie
      }
    });

  } catch (error) {
    console.error('Error adding movie:', error);
    return NextResponse.json(
      { error: `Failed to add movie: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
