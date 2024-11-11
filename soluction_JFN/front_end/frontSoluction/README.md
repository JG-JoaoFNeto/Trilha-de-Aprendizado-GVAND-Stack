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
