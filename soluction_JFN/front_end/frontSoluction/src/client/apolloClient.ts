import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { RestLink } from "apollo-link-rest";

// const api_key = import.meta.env.VUE_APP_API_KEY;

const customFetch = (uri: RequestInfo, options: RequestInit) => {
  return fetch(`${uri}?api_key=4cd21e460928c5e08daec89f2270146d`, options);
};

const restLink = new RestLink({
  uri: "https://api.themoviedb.org/3" ,
  customFetch,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: restLink,
  cache,
});