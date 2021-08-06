const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  bookCount: {
    type: Number,
    default: 0,
  },
  born: {
    type: Number,
  },
});

module.exports = mongoose.model('Author', schema);
