function unknownEndpoint(request, response) {
  return response
    .status(404)
    .send({ error: 'Unknown endpoint, please verify URL' });
}

module.exports = unknownEndpoint;
