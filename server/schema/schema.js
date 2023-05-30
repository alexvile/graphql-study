const graphql = require("graphql");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

const movies = [
  { id: "1", name: "Pulp Fiction", genre: "Crime", directorId: "2" },
  { id: "2", name: "1984", genre: "Sci-Fi", directorId: "1" },
];

const directors = [
  { id: "1", name: "James McTeigue", age: 51 },
  { id: "2", name: "Quentin Tarantino", age: 55 },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((el) => el.id === parent.id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return movies.find((el) => el.id === args.id);
      },
    },
    director: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return directors.find((el) => el.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
