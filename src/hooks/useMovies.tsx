import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { GenreProps, MovieProps } from '../types';

interface MoviesProviderProps {
  children: ReactNode;
}

interface moviesContextData {
  movies: MovieProps[];
  genres: GenreProps[];
  selectedGenre: GenreProps;
  selectedGenreId: number;
  handleChoiceOfGender: (id: number) => void;
}

const moviesContext = createContext<moviesContextData>(
  {} as moviesContextData
);

export function MoviesProvider({ children }: MoviesProviderProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [genres, setGenres] = useState<GenreProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps);

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleChoiceOfGender(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <moviesContext.Provider value={{
      movies,
      genres,
      selectedGenre,
      selectedGenreId,
      handleChoiceOfGender
    }}>
      {children}
    </moviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(moviesContext);

  return context;
}
