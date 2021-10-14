const Author = require("../../models/Author");
const Book = require("../../models/Book");
const { AuthorType } = require("./authorType");
const { BookType } = require("./bookType");

const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

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
      async resolve(parent, args) {
        const book = await Book.find();
        return book;
      },
    },
    authorBooks: {
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

module.exports = RootQuery;
