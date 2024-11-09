import { gql } from "@apollo/client/core";

export const UPCOMING_MOVIES_QUERY = gql`
  query getUpcomingMovies {
    upcomingMovies @rest(path: "/movie/upcoming") {
      results @type(name: "Movie") {
        title
        backdrop_path
        id
      }
    }
  }
`;
