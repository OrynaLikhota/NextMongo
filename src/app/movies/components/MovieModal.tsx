'use client';

import { Movie, NewMovie } from '../types/movie.types';
import MovieForm from './MovieForm';

interface MovieModalProps {
  isOpen: boolean;
  editingMovie: Movie | null;
  onClose: () => void;
  onEditMovie: (id: string, movie: NewMovie) => Promise<boolean>;
  loading?: boolean;
}

export default function MovieModal({ 
  isOpen, 
  editingMovie, 
  onClose, 
  onEditMovie, 
  loading = false 
}: MovieModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <MovieForm
          editingMovie={editingMovie}
          onEditMovie={onEditMovie}
          loading={loading}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
