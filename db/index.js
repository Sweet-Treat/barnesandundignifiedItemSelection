const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fecItemSelection', {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected to Mongo'));

const schema = new mongoose.Schema({
  "isbn": String,
  "formats": Array
});

var Book = mongoose.model('Book', schema);

module.exports = Book;