export type Movie = {
  id: string;
  title: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
};

export type ShortMovie = {
  id: string;
  title: string;
  backdrop_path: string;
};

export type PopularMovies = {
  popularMovies: {
    results: ShortMovie[];
  };
};

export type OriginalsMovies = {
  originalsMovies: {
    results: ShortMovie[];
  };
};