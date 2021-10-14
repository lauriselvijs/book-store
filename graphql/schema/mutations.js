const Author = require("../../models/Author");
const Book = require("../../models/Book");
const { AuthorType } = require("./authorType");
const { BookType } = require("./bookType");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

// Mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        birth_year: { type: new GraphQLNonNull(GraphQLString) },
        author_pic: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const author = await Author.create({
          name: args.name,
          birth_year: args.birth_year,
          author_pic: args.author_pic,
        });
        return author;
      },
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const author = await Author.deleteOne({
          _id: args._id,
        });
        return author;
      },
    },
    editAuthor: {
      type: AuthorType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        birth_year: { type: GraphQLString },
        author_pic: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const author = await Author.findOneAndUpdate(
          {
            _id: args._id,
          },
          {
            name: args.name,
            birth_year: args.birth_year,
            author_pic: args.author_pic,
          },
          {
            new: true,
          }
        );
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        ISBN_10: { type: new GraphQLNonNull(GraphQLString) },
        author_id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        page_count: { type: new GraphQLNonNull(GraphQLString) },
        book_cover: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const author = await Author.findById(args.author_id);

        if (!author) {
          return { error: "No author found" };
        }

        const book = await Book.create({
          ISBN_10: args.ISBN_10,
          author_id: args.author_id,
          title: args.title,
          year: args.year,
          page_count: args.page_count,
          book_cover: args.book_cover,
        });

        return book;
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        ISBN_10: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const book = await Book.deleteOne({
          ISBN_10: args.ISBN_10,
        });
        return book;
      },
    },
    editBook: {
      type: BookType,
      args: {
        ISBN_10: { type: GraphQLString },
        author_id: { type: GraphQLString },
        title: { type: GraphQLString },
        year: { type: GraphQLString },
        page_count: { type: GraphQLString },
        book_cover: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const author = await Author.findById(args.author_id);

        if (!author) {
          throw "No author ID provided";
        }

        const book = await Book.findOneAndUpdate(
          {
            ISBN_10: args.ISBN_10,
          },
          {
            author_id: args.name,
            title: args.birth_year,
            year: args.author_pic,
            page_count: args.page_count,
            book_cover: args.book_cover,
          },
          {
            new: true,
          }
        );
        return book;
      },
    },
  },
});

module.exports = mutation;
