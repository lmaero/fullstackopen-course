const express = require('express');
const cors = require('cors');
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./middleware/logger');
const requestLogger = require('./middleware/requestLogger');
const unknownEndpoint = require('./middleware/unknownEndpoint');

const app = express();

const blogsRouter = require('./controllers/blogs');

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger());

app.use('/api/blogs', blogsRouter);

app.use(unknownEndpoint);

module.exports = app;
