const express = require('express');
const app = express();
const port = 3001;


// serve the static files

//create a test hello world response to the root endpoint to check if everything works properly

app.use(express.static('client/dist'))

app.get('/', (req, res) => {
  res.send('Hello, world');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

