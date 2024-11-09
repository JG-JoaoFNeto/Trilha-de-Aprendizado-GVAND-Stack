# Vue 3 + Apollo + GraphQL + TypeScript + Vite

### Stack:
- [Vite](https://vitejs.dev/)
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)

## Introdução
1. Clonar repositório
   ```bash
   git clone https://github.com/mousemckill/netflix-clone-vag-stack.git
   ```
2. Navegue até a pasta com o código-fonte
   ```bash
   cd netflix-clone-vag-stack
   ```
3. Instalar dependências
   ```bash
   yarn
   ```
   OU

   ```bash
   npm install
   ```
4. Execute
   ```bash
   yarn dev
   ```
   OU

   ```bash
   npm run dev
   ```

## Setup
1. Instalar dependências
   ```bash
   yarn add @vue/apollo-composable graphql @apollo/client apollo-link-rest
   ```
   Ou

   ```bash
   npm install @vue/apollo-composable graphql @apollo/client apollo-link-rest
   ```

2. Buscar no site TMDB a sua API key
   - Abra em seu browser https://www.themoviedb.org/
   - Click em by Join TMDB
   - Preencha o formulário de inscrição e pressione o botão SignUp
   - Login com e-mail e senha
   - Vá até https://www.themoviedb.org/settings/api
   - Copie `API Key (v3 auth)` value
   - Abra o arquivo `.env` e insira esse - key value

## Work with code
1. Criação do Apollo Client
   Crie o arquivo `src/apolloClient.ts` e adicione
   ```javascript
    import { ApolloClient, InMemoryCache } from "@apollo/client/core";
    import { RestLink } from "apollo-link-rest";

    const API_KEY = import.meta.env.VITE_API_KEY;

    const customFetch = (uri: RequestInfo, options: RequestInit) => {
      return fetch(`${uri}?api_key=${API_KEY}`, options);
    };

    const restLink = new RestLink({
      uri: "https://api.themoviedb.org/3",
      customFetch,
    });

    const cache = new InMemoryCache();

    export const apolloClient = new ApolloClient({
      link: restLink,
      cache,
    });
   ```
2. Conecte o Apollo Client no Vue 
   Abra o arquivo main `src/main.ts` e substitua tudo por
    ```javascript
    import { createApp, provide, h } from "vue";
    import { DefaultApolloClient } from "@vue/apollo-composable";

    import App from "./App.vue";
    import { apolloClient } from "./apolloClient";

    import "./index.css";

    const app = createApp({
      setup() {
        provide(DefaultApolloClient, apolloClient);
      },
      render: () => h(App),
    });

    app.mount("#app");
    ```
3. Crie o arquivo `src/graphql/schema.graphql`
    ```graphql
    directive @type(name: String!) on FIELD
    directive @type(name: String!) on FIELD
    directive @rest(path: String!, type: String) on FIELD

    type Movie {
      title: String!
      backdrop_path: String!
      id: Int!
    }

    type MovieFull {
      id: Int
      title: String
      backdrop_path: String
      release_date: String
      overview: String
      vote_average: Int
      vote_count: Int
    }

    type MoviePayload {
      results: Movie
    }

    type Query {
      trendingMovies: MoviePayload!
      nowPlayingMovies: MoviePayload!
      originalMovies: MoviePayload!
      topRatedMovies: MoviePayload!
      popularMovies: MoviePayload!
      upcomingMovies: MoviePayload!
      movie(id: String!): MovieFull!
    }

    schema {
      query: Query
    }
    ```
4.  Crie o arquivo `src/graphql/queries/getUpcomingMovies.ts`
    ```typescript
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

    ```
5.  Abra o Arquivo `src/components/UpcomingMovies.vue` e substitua tudo por
    ```html
    <script setup lang="ts">
    import { useQuery } from "@vue/apollo-composable";

    import MoviesSection from "./MoviesSection.vue";
    import { UpcomingMovies } from "../typings/Movie";
    import { UPCOMING_MOVIES_QUERY } from "../graphql/queries/getUpcomingMovies";

    const { result } = useQuery<UpcomingMovies>(UPCOMING_MOVIES_QUERY);
    </script>

    <template>
      <MoviesSection
        v-if="result"
        title="Upcoming"
        :items="result.upcomingMovies.results"
      />
    </template>
    ```
6.  Repita as etapas 4 e 5 para outros componentes que contenham `MovieSection` 
7.  Create file `src/graphql/queries/getMovie.ts`
    ```TypeScript
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
    ```
8. Edit o arquivo `src/components/MoviePreview.vue`
    ```typescript
    const props = defineProps<{
      id: number;
    }>();

    const { result } = useQuery<{ movie: FullMovie }>(MOVIE_QUERY, {
      id: props.id,
    });
    ```

## TMDB HTTP endpoints
TMDB `API_URL` - `https://api.themoviedb.org/3` 

Detalhe do Filme
```http
GET {API_URL}/movie/338953?api_key={API_KEY} HTTP/1.1
```
Filmes Populares
```http
GET {API_URL}/movie/popular?api_key={API_KEY} HTTP/1.1
```
Filmes mais bem avaliados
```http
GET {API_URL}/movie/top_rated?api_key={API_KEY} HTTP/1.1
```
Agora reproduzindo filmes
```http
GET {API_URL}/movie/now_playing?api_key={API_KEY} HTTP/1.1
```
Próximos filmes
```http
GET {API_URL}/movie/upcoming?api_key={API_KEY} HTTP/1.1
```
Filmes populares
```http
GET {API_URL}/trending/movie/week?api_key={API_KEY} HTTP/1.1
```
