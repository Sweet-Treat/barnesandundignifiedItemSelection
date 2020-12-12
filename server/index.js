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
  return axios.get(`http://localhost:5001/products/${isbn}`);


   // .then((data) => cb(null, data.data))
   // .catch((err) => cb(err))
}

// try running a get request on someone elses endpoint - do an axios request
function getSummaryReview(isbn, cb) {
  console.log('hello from get reviews')
  return axios.get(`http://localhost:8000/books/${isbn}/reviews`);
//    .then((data) => cb(null, data.data))
//    .catch(() => cb(err))
}

app.get('/product/:id/formats', (req, res) => {
  var id = req.params.id || '9780765326386';
  bookInfo = {}
  Promise.all([getTitleAndAuthor(id), getSummaryReview(id)])
    .then( (results) => {
      bookInfo.titleAndAuthor = {
        title: results[0].data.bookTitle,
        author: results[0].data.author,
        publisher: results[0].data.publisherName,
        publicationDate: results[0].data.publicationDate
      };
      var summaryReview = Model.createSummaryReview(results[1].data)
      bookInfo.reviews = summaryReview;

      Books.findOne({isbn: id}, (err, result) => {
        if (err) {
          console.log('ISBN inventory does not exist')
          res.send();
        } else {
          console.log('ISBN inventory exists')
          bookInfo.formats = result.formats;
          res.send(bookInfo);
        }
      })
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})