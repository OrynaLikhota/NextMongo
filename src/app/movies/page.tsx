'use client';

import { useEffect, useState } from 'react';

interface Movie {
  _id: string;
  title: string;
  year?: number;
  plot?: string;
  poster?: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            {movie.year && <p className="text-gray-600">Year: {movie.year}</p>}
            {movie.plot && <p className="mt-2">{movie.plot}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
