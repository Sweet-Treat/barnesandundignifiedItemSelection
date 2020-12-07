const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
var cors = require('cors');
const app = express();
const port = 3001;

const Model = require('../db/model.js');

const Books = require('../db/index.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/dist'))


// try running a get request on someone elses endpoint - do an axios request
function getTitleAndAuthor(isbn, cb) {
  console.log('hello from get title and author')
  axios({
    method: 'get',
    url: `http://localhost:5001/products/${isbn}`
  })
    .then((data) => cb(null, data.data))
    .catch((err) => cb(err))
}

// try running a get request on someone elses endpoint - do an axios request
function getSummaryReview(isbn, cb) {
  console.log('hello from get summary reviews')
  axios({
    method: 'get',
    url: `http://localhost:8000/books/${isbn}/reviews`
  })
    .then((data) => cb(null, data.data))
    .catch(() => cb(err))
}

app.get('/product/:id/formats', (req, res) => {
  var id = req.params.id || '22801693950634';
  bookInfo = {}
  getTitleAndAuthor(id, (err, data) => {
    bookInfo.titleAndAuthor = {
      title: data.bookTitle,
      author: data.author,
      publisher: data.publisherName,
      publicationDate: data.publicationDate
    };
    getSummaryReview(id, (err, data) => {
      var summaryReview = Model.createSummaryReview(data)
      bookInfo.reviews = summaryReview;
      Books.findOne({isbn: id}, (err, results) => {
        if (err) {
          console.log('ISBN inventory does not exist')
          res.send();
        } else {
          console.log('ISBN inventory exists')
          bookInfo.formats = results.formats;
          res.send(bookInfo);
        }
      })
    });
  });
});

// hard coding what the product endpoint should return
app.get('/product/:id', (req, res) => {
  var product = {
    title: 'Rhythm of War (Stormlight Archive Series #4)',
    author: 'Brandon Sanderson'
  }
  res.send(product);
})

// hard coding what the reviews endpoint should return
app.get('/reviewssummary/:id', (req, res) => {
  var reviews = {
    totalReviews: 10,
    avgRating: 2.5
  }
  res.send(reviews);
})




app.get('/', (req, res) => {
  res.send('Hello, world');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

