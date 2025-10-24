import { useState } from 'react';
import { Movie, NewMovie } from '../types/movie.types';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: any;
  editMovie: (id: string, movie: NewMovie) => Promise<boolean>;
  deleteMovie: (id: string) => Promise<boolean>;
  editingMovie: boolean;
  deletingMovie: boolean;
}

export default function MovieList({ 
  movies, 
  loading, 
  error, 
  editMovie, 
  deleteMovie, 
  editingMovie, 
  deletingMovie 
}: MovieListProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movies || movies.length === 0) return <div>No movies found</div>;

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
            onEdit={handleEditMovie}
            onDelete={deleteMovie}
            deleting={deletingMovie}
          />
        ))}
      </div>

      <MovieModal
        isOpen={isModalOpen}
        editingMovie={selectedMovie}
        onClose={handleCloseModal}
        onEditMovie={editMovie}
        loading={editingMovie}
      />
    </>
  );
}
