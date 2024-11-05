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
