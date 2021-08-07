const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

const MONGODB_URI = 'mongodb://localhost:27017/library-graphql?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

console.log(`Connecting to: ${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Error connection to MongoDB: ${error.message}`);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genres:[String!]): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({});

      if (args.genres) {
        filteredBooks = await Book.find({ genres: { $in: args.genres } });
      }

      return filteredBooks;
    },
  },

  Author: {
    bookCount: (root) => Book.countDocuments({ author: root.id }),
  },

  Mutation: {
    addBook: async (root, args) => {
      const { title, published, genres } = args;
      let bookAuthor;

      const isExistingAuthor = await Author.findOne({ name: args.author });

      if (!isExistingAuthor) {
        const newAuthor = new Author({
          name: args.author,
          bookCount: 0,
          born: args.author.born || null,
        });
        try {
          bookAuthor = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      } else {
        bookAuthor = isExistingAuthor;
      }

      const book = new Book({
        title,
        published,
        author: bookAuthor,
        genres,
      });

      try {
        return book.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },

    editAuthor: async (root, args) => {
      const { name, setBornTo } = args;
      const author = await Author.findOne({ name });

      if (!author) {
        throw new Error(`Author ${name} not found`);
      }

      author.born = setBornTo;

      try {
        return await author.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
