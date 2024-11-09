import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import env from 'env-var';

const config ={
    url: env.get('URL_NEO4J').required().asUrlString(),
    user: env.get('USER_NEO4J').required().asString(),
    password: env.get('PASS_NEO4J').required().asString()
}

const typeDefs = `#graphql
    type ActedInProperties @relationshipProperties {
        role: String
    }

    type Actor @node(labels: ["Actor", "Person"]) {
        actedInMovies: [Movie!]!
            @relationship(
            type: "ACTED_IN"
            direction: OUT
            properties: "ActedInProperties"
            )
        bio: String
        born: Date
        bornIn: String
        died: Date
        imdbId: String
        name: String!
        poster: String
        tmdbId: String!
        url: String!
    }

    type Actor2 @node(labels: ["Actor", "Director", "Person"]) {
        actedInMovies: [Movie!]!
            @relationship(
            type: "ACTED_IN"
            direction: OUT
            properties: "ActedInProperties"
            )
        bio: String
        born: Date
        bornIn: String
        died: Date
        directedMovies: [Movie!]!
            @relationship(
            type: "DIRECTED"
            direction: OUT
            properties: "DirectedProperties"
            )
        imdbId: String
        name: String!
        poster: String
        tmdbId: String!
        url: String!
    }

    type DirectedProperties @relationshipProperties {
        role: String
    }

    type Director @node(labels: ["Director", "Person"]) {
        bio: String
        born: Date
        bornIn: String
        died: Date
        imdbId: String
        name: String!
        poster: String
        tmdbId: String!
        url: String!
    }

    type Genre @node {
        moviesInGenre: [Movie!]! @relationship(type: "IN_GENRE", direction: IN)
        name: String!
    }

    type Movie @node {
        actor2SActedIn: [Actor2!]!
            @relationship(
            type: "ACTED_IN"
            direction: IN
            properties: "ActedInProperties"
            )
        actor2SDirected: [Actor2!]!
            @relationship(
            type: "DIRECTED"
            direction: IN
            properties: "DirectedProperties"
            )
        actorsActedIn: [Actor!]!
            @relationship(
            type: "ACTED_IN"
            direction: IN
            properties: "ActedInProperties"
            )
        budget: BigInt
        countries: [String]
        imdbId: String!
        imdbRating: Float
        imdbVotes: BigInt
        inGenreGenres: [Genre!]! @relationship(type: "IN_GENRE", direction: OUT)
        languages: [String]
        movieId: String!
        plot: String
        poster: String
        released: String
        revenue: BigInt
        runtime: BigInt
        title: String!
        tmdbId: String
        url: String
        usersRated: [User!]!
            @relationship(type: "RATED", direction: IN, properties: "RatedProperties")
        year: BigInt
    }


    extend type Movie {
        avgRating: Float
            @cypher(
            statement: """
            MATCH (this)<-[r:RATED]-(:User)
            RETURN avg(r.rating) AS result
            """
            columnName: "result"
            )
        recommended(limit: Int = 3): [Movie!]!
            @cypher(
            statement: """
            MATCH (this)<-[:RATED]-(u:User)-[:RATED]->(rec:Movie)
            WITH rec, COUNT(u) AS score ORDER BY score DESC
            RETURN rec LIMIT $limit
            """,
            columnName: "rec"
            )
    }
    type RatedProperties @relationshipProperties {
        rating: Float!
        timestamp: BigInt!
    }

    type User @node {
        name: String!
        ratedMovies: [Movie!]!
            @relationship(type: "RATED", direction: OUT, properties: "RatedProperties")
        userId: String!
    }

`;

const driver = neo4j.driver(
    config.url,
    neo4j.auth.basic(config.user, config.password)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);