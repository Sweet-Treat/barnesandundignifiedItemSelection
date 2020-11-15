const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

const Books = require('../db/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve the static files

//create a test hello world response to the root endpoint to check if everything works properly

app.use(express.static('client/dist'))

app.get('/getInventory/:id', (req, res) => {
  var id = req.params.id || 1;
  Books.findOne({isbn: id}, (err, bookInfo) => {
    if (err) {
      console.log('ISBN inventory does not exist')
      res.send();
    } else {
      console.log('ISBN inventory exists')
     // console.log('bookInfo', bookInfo)
      res.send(bookInfo);
    }
  })
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

