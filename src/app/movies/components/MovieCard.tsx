import { Movie } from '../types/movie.types';

interface MovieCardProps {
  movie: Movie;
  onEdit?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
  deleting?: boolean;
}

export default function MovieCard({ movie, onEdit, onDelete, deleting }: MovieCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow relative">
      <div className="absolute top-2 right-2 flex gap-1">
        {onEdit && (
          <button
            onClick={() => onEdit(movie)}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded"
            title="Edit"
          >
            ✏️
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={() => onDelete(movie._id)}
            disabled={deleting}
            className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded disabled:opacity-50"
            title="Delete"
          >
            🗑️
          </button>
        )}
      </div>
      
      <h2 className="text-xl font-semibold pr-16">{movie.title}</h2>
      {movie.year && <p className="text-gray-600">Year: {movie.year}</p>}
      {movie.plot && <p className="mt-2">{movie.plot}</p>}
    </div>
  );
}
