const graphql = require("graphql");

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const movies = [
  { id: "1", name: "Pulp Fiction", genre: "Crime" },
  { id: "2", name: "1984", genre: "Sci-Fi" },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
        return movies.find((m) => m.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
