import { gql } from "@apollo/client/core";

export const GET_POPULAR_QUERY = gql`
  query getPopular {
    popularMovies @rest(type: "PopularMovies", path: "/movie/popular") {
      results @type(name: "Movie"){
        id
        title
        backdrop_path
      }
    }
  }
`;