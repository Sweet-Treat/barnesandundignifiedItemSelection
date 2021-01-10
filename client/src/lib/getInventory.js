import axios from 'axios';

var getInventory = (isbn, cb) => {
  axios.get(`http://18.188.228.195/product/${isbn}/formats`)
  .then((data) => cb(null, data))
  .catch((err) => cb(err))
}

export default getInventory;