import axios from 'axios';

var getInventory = (isbn, cb) => {
  axios.get(`http://localhost:3001/product/${isbn}/formats`)
  .then((data) => cb(null, data))
  .catch((err) => cb(err))
}

export default getInventory;