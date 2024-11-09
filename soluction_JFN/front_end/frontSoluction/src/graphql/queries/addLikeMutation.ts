import { gql } from "@apollo/client/core";

export const ADD_LIKE_MUTATION = gql `
    mutation addLikeMutation($id: String!){
        addLike @client 
    }
`;