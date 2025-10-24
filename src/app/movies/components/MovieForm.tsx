'use client';

import { useState, useEffect } from 'react';
import { NewMovie, Movie } from '../types/movie.types';

interface MovieFormProps {
  onAddMovie?: (movie: NewMovie) => Promise<boolean>;
  onEditMovie?: (id: string, movie: NewMovie) => Promise<boolean>;
  editingMovie?: Movie | null;
  loading?: boolean;
  onCancel?: () => void;
}

export default function MovieForm({ 
  onAddMovie, 
  onEditMovie, 
  editingMovie, 
  loading = false,
  onCancel 
}: MovieFormProps) {
  const [formData, setFormData] = useState<NewMovie>({
    title: '',
    year: undefined,
    plot: '',
    poster: ''
  });

  const isEditing = !!editingMovie;

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title || '',
        year: editingMovie.year || undefined,
        plot: editingMovie.plot || '',
        poster: editingMovie.poster || ''
      });
    } else {
      setFormData({ title: '', year: undefined, plot: '', poster: '' });
    }
  }, [editingMovie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      let success = false;
      if (isEditing && onEditMovie && editingMovie) {
        success = await onEditMovie(editingMovie._id, {
          ...formData,
          year: formData.year || undefined
        });
      } else if (onAddMovie) {
        success = await onAddMovie({
          ...formData,
          year: formData.year || undefined
        });
      }
      
      if (success) {
        setFormData({ title: '', year: undefined, plot: '', poster: '' });
        if (onCancel) onCancel();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? (value ? parseInt(value) : undefined) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {isEditing ? 'Edit Movie' : 'Add New Movie'}
        </h3>
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Year:</label>
        <input
          type="number"
          name="year"
          value={formData.year || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1900"
          max={new Date().getFullYear() + 5}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description:</label>
        <textarea
          name="plot"
          value={formData.plot}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Poster URL:</label>
        <input
          type="url"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !formData.title.trim()}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 
            (isEditing ? 'Saving...' : 'Adding...') : 
            (isEditing ? 'Save Changes' : 'Add Movie')
          }
        </button>
        
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
