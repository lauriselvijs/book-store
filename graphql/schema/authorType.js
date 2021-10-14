const { GraphQLObjectType, GraphQLString } = require("graphql");

// Author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    author_pic: { type: GraphQLString },
  }),
});

exports.AuthorType = AuthorType;
