const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fecItemSelection', {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected to Mongo'));

const schema = new mongoose.Schema({
  "isbn": Number,
  "title": String,
  "author": String,
  "reviews": {
    "score": Number,
    "number": Number
    },
  "options": Array
});

var Book = mongoose.model('Book', schema);

module.exports = Book;