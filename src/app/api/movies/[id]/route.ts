import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { ObjectId } from 'mongodb';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Updating movie with ID:', params.id);
    
    const body = await request.json();
    console.log('Update data:', body);
    
    const { title, year, plot, poster } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('movies_test');

    const updateData = {
      title,
      year: year || null,
      plot: plot || null,
      poster: poster || null,
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    const updatedMovie = await collection.findOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({
      success: true,
      data: updatedMovie
    });

  } catch (error) {
    console.error('Error updating movie:', error);
    return NextResponse.json(
      { error: `Failed to update movie: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Deleting movie with ID:', params.id);

    const { db } = await connectToDatabase();
    const collection = db.collection('movies_test');

    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Movie deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting movie:', error);
    return NextResponse.json(
      { error: `Failed to delete movie: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
