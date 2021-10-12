const Author = require("../../models/Author");
const Book = require("../../models/Book");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

// Author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    author_id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    author_pic: { type: GraphQLString },
  }),
});

// Book type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    ISBN: { type: GraphQLString },
    author_id: { type: GraphQLString },
    title: { type: GraphQLString },
    year: { type: GraphQLString },
    page_count: { type: GraphQLString },
    book_cover: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // Return authors
        const authors = await Author.find();
      },
    },
    author: {
      type: AuthorType,
      args: {
        author_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Return author by its id
        const author = await Author.findById(args.author_id);
      },
    },
    book: {
      type: BookType,
      args: {
        ISBN: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Return book by its ISBN
        const book = await Book.findOne({ ISBN: args.ISBN });
      },
    },
  },
  books: {
    type: BookType,
    args: {
      author_id: { type: GraphQLString },
    },
    async resolve(parent, args) {
      // Return all books by author id
      const author = await Author.findById(args.author_id);
      const books = await Book.find({ author_id: args.author_id });
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
