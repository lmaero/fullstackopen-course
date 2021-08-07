const {
  ApolloServer, gql, UserInputError, AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const JWT_SECRET = 'super-secret';

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genres:[String!]): [Book]
    allAuthors: [Author]
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: (root) => Book.countDocuments({ author: root._id }),
    name: async (root) => {
      const author = await Author.findOne({ _id: root._id });
      return author.name;
    },
    born: async (root) => {
      const author = await Author.findOne({ _id: root._id });
      return author.born;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const { title, published, genres } = args;
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError('You must be logged in');
      }

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

    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args;
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError('You must be logged in');
      }

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
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;
      const user = new User({
        username,
        favoriteGenre,
      });

      try {
        return await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError(`User ${username} not found`);
      }

      if (password !== 'secret') {
        throw new UserInputError('Invalid password');
      }

      const userForToken = {
        username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, JWT_SECRET);
      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }

    return {};
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
