"use client";

import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import { useMovies } from "./hooks/useMovies";

export default function MoviesPage() {
  const { movies, loading, addingMovie, error, addMovie, editMovie, deleteMovie, deletingMovie } = useMovies();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <MovieForm onAddMovie={addMovie} loading={addingMovie} />
      <MovieList
        movies={movies}
        loading={loading}
        error={error}
        editMovie={editMovie}
        editingMovie={false}
        deletingMovie={deletingMovie}
        deleteMovie={deleteMovie} />
    </div>
  );
}
