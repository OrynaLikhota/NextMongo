import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";

export async function GET(request: NextRequest, response: NextResponse) {
  const { db } = await connectToDatabase();
  try {
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    return NextResponse.json({ message: "Movies from sample_mflix", data: movies }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
