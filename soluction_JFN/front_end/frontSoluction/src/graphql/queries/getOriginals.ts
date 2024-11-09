import { gql } from "@apollo/client/core";

export const GET_ORIGINALS_QUERY = gql`
  query getOriginals($mediaType: String!) {
    originalsMovies( mediaType: $mediaType ) @rest(type: "OriginalsMovies", path: "/trending/{args.mediaType}/week") {
      results @type(name: "Movie"){
        id
        title
        backdrop_path
      }
    }
  }
`;