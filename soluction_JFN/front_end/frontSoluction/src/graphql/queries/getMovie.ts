import { gql } from "@apollo/client/core";

export const MOVIE_QUERY = gql`
  query getMovie($id: String!) {
    movie(id: $id) @rest(type: "Movie", path: "/movie/{args.id}") {
      id
      title
      backdrop_path
      release_date
      overview
      vote_average
      vote_count
    }
  }
`;