# Projeto Back-end sistema de recomendação de filmes






**Objetivo**: Criar uma API GraphQL para o sistema de recomendação de filmes

## Habilidades desenvolvidas

Ao fim deste projeto você terá os seguintes superpoderes, você será capaz de:

- Compreender conceitos básicos do Neo4j e seus benefícios como banco de dados em grafos.
- Aplicar algoritmos de similaridade em grafos para recomendação.
- Criar APIs GraphQL com Neo4j como banco de dados, utlizando a biblioteca @neo4j/graphql, a base da GRAND Stack.

## Funcionalidades

- Nós disponíveis para CRUD: User, Director, Actor, Movie e Genre.
- CRUD de relacionamento entre User e Movie. Para salvar um rating que o usuário deu para determinado filme.
- Filmes similares a determinado filme, usando Content-Based Filtering.
- Recomendação de filmes para determinado usuário, usando Collaboritive Filtering.
- Implementar uma query com [full-text search](https://neo4j.com/docs/graphql-manual/current/type-definitions/indexes-and-constraints) e [fuzzy match](https://neo4j.com/labs/apoc/4.3/overview/apoc.text/apoc.text.fuzzyMatch) para encontrar filmes baseado na busca escrita do usuário.

## Stack e requisitos técnicos

Para este projeto é recomendado que você já saiba os fundamentos do [Neo4j](https://neo4j.com/), você pode iniciar sua jornada utilizando o [Neo4j Sandbox de Movie Recommendation](https://neo4j.com/sandbox/). Assim como também é recomendado que você entenda os [fundamentos do GraphQL](https://graphql.org/learn/).

Neste projeto, você usará as seguintes tecnologias:

- Neo4j: como banco de dados em grafo para toda a aplicação.
- Apollo Server: ferramenta consistente para GraphQL no desenvolvimento do lado do servidor.
- @neo4j/graphql: biblioteca para facilitar a criação de APIs em GraphQL + Neo4j, a base para a GRAND stack.
