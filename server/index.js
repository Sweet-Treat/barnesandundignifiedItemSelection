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

app.get('/:id', (req, res) => {
  var id = req.params.id || 1;
  Books.findOne({isbn: id}, (err, bookInfo) => {
    if (err) {
      console.log('Book does not exist')
      res.send();
    } else {
      console.log('Book exists')
     // console.log('bookInfo', bookInfo)
      res.send(bookInfo);
    }
  })
})

app.get('/', (req, res) => {
  res.send('Hello, world');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

