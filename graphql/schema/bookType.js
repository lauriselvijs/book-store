const { GraphQLObjectType, GraphQLString } = require("graphql");

// Book type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    ISBN_10: { type: GraphQLString },
    author_id: { type: GraphQLString },
    title: { type: GraphQLString },
    year: { type: GraphQLString },
    page_count: { type: GraphQLString },
    book_cover: { type: GraphQLString },
  }),
});

exports.BookType = BookType;
