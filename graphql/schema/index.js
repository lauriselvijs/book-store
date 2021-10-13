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
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    author_pic: { type: GraphQLString },
  }),
});

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

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // Return all authors
        const authors = await Author.find();
        return authors;
      },
    },
    author: {
      type: AuthorType,
      args: {
        _id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Return author by its id
        const author = await Author.findById(args._id);
        return author;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      args: {
        author_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Return all books by author id
        const author = await Author.findById(args.author_id);
        const books = await Book.find({ author_id: author._id });
        return books;
      },
    },
    book: {
      type: BookType,
      args: {
        ISBN_10: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const book = await Book.findOne({ ISBN_10: args.ISBN_10 });
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
