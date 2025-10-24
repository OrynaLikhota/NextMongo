export interface Movie {
  _id: string;
  title: string;
  year?: number;
  plot?: string;
  poster?: string;
}

export interface NewMovie {
  title: string;
  year?: number;
  plot?: string;
  poster?: string;
}

export interface MovieFormData extends NewMovie {}

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error?: string;
}

export type MovieGenre = 'action' | 'comedy' | 'drama' | 'horror' | 'romance' | 'sci-fi';
