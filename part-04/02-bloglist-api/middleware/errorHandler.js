const logger = require('./logger');

function errorHandler(error, request, response, next) {
  logger.error(`Error name: ${error.name}`);

  if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ error: error.message });
  }

  if (error.name === 'MongoError') {
    return response
      .status(400)
      .json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return response
      .status(401)
      .json({ error: error.message });
  }

  if (error.name === 'TokenExpiredError') {
    return response
      .status(401)
      .json({ error: error.message });
  }

  return next(error);
}

module.exports = errorHandler;
