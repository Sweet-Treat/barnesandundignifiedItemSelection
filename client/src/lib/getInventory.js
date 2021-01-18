import axios from 'axios';

var getInventory = (isbn, cb) => {
  axios.get(`/product/${isbn}/formats`) // endpoint locally
  //axios.get(`http://18.188.228.195:3001/product/${isbn}/formats`) // endpoint for production
  .then((data) => cb(null, data))
  .catch((err) => cb(err))
}

export default getInventory;