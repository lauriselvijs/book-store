const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

// Book type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    ISBN_10: { type: GraphQLString },
    author_id: { type: GraphQLString },
    title: { type: GraphQLString },
    year: { type: GraphQLInt },
    page_count: { type: GraphQLInt },
    book_cover: { type: GraphQLString },
  }),
});

exports.BookType = BookType;
