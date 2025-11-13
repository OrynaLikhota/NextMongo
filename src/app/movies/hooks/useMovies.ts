'use client';

import { useEffect, useState } from 'react';
import { Movie, NewMovie } from '../types/movie.types';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingMovie, setAddingMovie] = useState(false);
  const [editingMovie, setEditingMovie] = useState(false);
  const [deletingMovie, setDeletingMovie] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log('Fetching movies...');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('/api/movies', {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched movies:', data);
        setMovies(data.data || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            setError('Request timeout - please check your internet connection');
          } else if (error.message.includes('ETIMEDOUT')) {
            setError('Database connection timeout - please try again later');
          } else {
            setError(`Failed to load movies: ${error.message}`);
          }
        } else {
          setError('Failed to load movies');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const deleteMovie = async (id: string) => {
    setDeletingMovie(true);
    setError(null);

    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete movie');
      }

      const result = await response.json();

      if (result.success) {
        setMovies(prev => prev.filter(movie => movie._id !== id));
        return true;
      } else {
        throw new Error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete movie');
      return false;
    } finally {
      setDeletingMovie(false);
    }
  };

  const addMovie = async (newMovie: NewMovie) => {
    setAddingMovie(true);
    setError(null);
    
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newMovie)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add movie');
      }

      const result = await response.json();
      
      if (result.success) {
        setMovies(prev => [...prev, result.data]);
        return true;
      } else {
        throw new Error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setError(error instanceof Error ? error.message : 'Failed to add movie');
      return false;
    } finally {
      setAddingMovie(false);
    }
  };

  const editMovie = async (id: string, updatedMovie: NewMovie) => {
    setEditingMovie(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(updatedMovie)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update movie');
      }

      const result = await response.json();
      
      if (result.success) {
        setMovies(prev => prev.map(movie => 
          movie._id === id ? result.data : movie
        ));
        return true;
      } else {
        throw new Error('Failed to update movie');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      setError(error instanceof Error ? error.message : 'Failed to update movie');
      return false;
    } finally {
      setEditingMovie(false);
    }
  };

  return {
    movies,
    loading,
    addingMovie,
    editingMovie,
    deletingMovie,
    error,
    addMovie,
    editMovie,
    deleteMovie
  };
}
