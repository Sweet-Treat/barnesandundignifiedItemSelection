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
  // commented out the actual get request until other have their servers up and running
  //return axios.get(`http://3.16.221.35:5001/products/${isbn}`);
  return dummyProduct; // <-- comment this out once the the row above is uncommented


   // .then((data) => cb(null, data.data))
   // .catch((err) => cb(err))
}


// try running a get request on someone elses endpoint - do an axios request
function getSummaryReview(isbn, cb) {
  console.log('hello from get reviews')
  // commented out the actual get request until other have their servers up and running
  //return axios.get(`http://http://3.140.58.207/:8000/books/${isbn}/reviews`);
  return dummyReviews; // <-- comment this out once the the row above is uncommented
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


var dummyProduct = {
  data: {
    "_id": "5fcc03a13b16e5adeeb885fd",
    "isbn13": "9781524763169",
    "author": "Barack Obama",
    "bookTitle": "A Promised Land",
    "publisherName": "Crown Publishing Group",
    "publisherLink": "/publisher",
    "publicationDate": "2020-11-17T08:00:00.000Z",
    "series": "",
    "bookCategory": "Autobiography",
    "ageRange": "",
    "pages": 768,
    "salesRank": 1,
    "format": "",
    "editionDescription": "",
    "productDimensions": "6.40(w) x 9.40(h) x 1.50(d)",
    "__v": 0
  }
}


var dummyReviews = {
  data: [
    {
      "_id": "5fc5b4e04cafbc35a2410863",
      "author": "Bettye Miles",
      "location": "Marshall Islands",
      "authorReviews": 17,
      "votes": 29,
      "readerType": "On-Trend Reader",
      "rating": 1,
      "createdAt": "2020-06-03T13:29:42.000Z",
      "title": "officia esse ad anim ut",
      "body": "Adipisicing anim adipisicing do culpa aliqua minim ullamco elit proident. Aute deserunt nostrud fugiat anim nisi tempor nisi deserunt esse nulla anim aliqua ad. Officia aliquip adipisicing nostrud quis non ut proident. Laborum est minim incididunt reprehenderit laboris ex irure. Nostrud pariatur ipsum cupidatat in. Aute deserunt ex tempor consequat ut nulla non aliqua dolor proident sit ea.",
      "spoilers": false,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410864",
              "tagName": "Laughed Out Loud"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410865",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410866",
              "tagName": "Literary Acclaim"
          }
      ],
      "recommended": false,
      "helpfulYes": 17,
      "helpfulNo": 15
  },
  {
      "_id": "5fc5b4e04cafbc35a2410867",
      "author": "Freda Adkins",
      "location": "Arkansas",
      "authorReviews": 24,
      "votes": 180,
      "readerType": "Casual Reader",
      "rating": 2,
      "createdAt": "2020-03-19T09:36:51.000Z",
      "title": "incididunt dolore commodo reprehenderit aliquip",
      "body": "Lorem eiusmod officia in magna veniam commodo tempor magna et voluptate. Ullamco occaecat nostrud non minim ullamco deserunt. Culpa excepteur aliqua irure nostrud.",
      "spoilers": true,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410868",
              "tagName": "Emotional"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410869",
              "tagName": "Instagram-able Cover"
          },
          {
              "_id": "5fc5b4e04cafbc35a241086a",
              "tagName": "Quick Read"
          }
      ],
      "recommended": false,
      "helpfulYes": 5,
      "helpfulNo": 16
  },
  {
      "_id": "5fc5b4e04cafbc35a241086b",
      "author": "Mae Pugh",
      "location": "Michigan",
      "authorReviews": 79,
      "votes": 35,
      "readerType": "Casual Reader",
      "rating": 2,
      "createdAt": "2020-09-26T03:04:14.000Z",
      "title": "irure quis amet ullamco quis",
      "body": "Elit est pariatur ea dolore. Excepteur mollit amet quis esse velit. Cillum non minim aute elit occaecat duis labore qui sit labore. Qui ut qui sint dolor do est ad minim velit officia.",
      "spoilers": false,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a241086c",
              "tagName": "Laughed Out Loud"
          },
          {
              "_id": "5fc5b4e04cafbc35a241086d",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a241086e",
              "tagName": "Quick Read"
          }
      ],
      "recommended": false,
      "helpfulYes": 11,
      "helpfulNo": 1
  },
  {
      "_id": "5fc5b4e04cafbc35a241086f",
      "author": "Golden George",
      "location": "Kentucky",
      "authorReviews": 6,
      "votes": 74,
      "readerType": "Casual Reader",
      "rating": 2,
      "createdAt": "2020-01-05T22:08:22.000Z",
      "title": "tempor aliquip sunt aute veniam",
      "body": "Sint ullamco deserunt pariatur id proident aliquip aliquip do adipisicing exercitation est officia. Adipisicing proident quis ut anim qui dolor sint voluptate consequat est minim. Ex eiusmod voluptate mollit minim labore mollit reprehenderit. Officia consectetur pariatur qui do adipisicing minim sit eiusmod.",
      "spoilers": true,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410870",
              "tagName": "Inspirational"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410871",
              "tagName": "Instagram-able Cover"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410872",
              "tagName": "Literary Acclaim"
          }
      ],
      "recommended": true,
      "helpfulYes": 20,
      "helpfulNo": 13
  },
  {
      "_id": "5fc5b4e04cafbc35a2410873",
      "author": "Vang Sawyer",
      "location": "Georgia",
      "authorReviews": 32,
      "votes": 188,
      "readerType": "Book Club Reader",
      "rating": 4,
      "createdAt": "2020-02-11T00:16:40.000Z",
      "title": "in commodo Lorem aliqua velit",
      "body": "Ut eiusmod irure aute officia deserunt in pariatur amet proident ut proident. Sit ullamco consectetur enim culpa irure sint est occaecat ut anim. Eu ad minim deserunt eu cillum amet consequat non in ut proident. Nostrud ea amet ex amet fugiat eu dolore duis aute exercitation Lorem. Non deserunt mollit dolor ad fugiat ad dolore.",
      "spoilers": false,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410874",
              "tagName": "Laughed Out Loud"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410875",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410876",
              "tagName": "Quick Read"
          }
      ],
      "recommended": false,
      "helpfulYes": 12,
      "helpfulNo": 15
  },
  {
      "_id": "5fc5b4e04cafbc35a2410877",
      "author": "Estela Wagner",
      "location": "New York",
      "authorReviews": 78,
      "votes": 122,
      "readerType": "Hopeless Romantic",
      "rating": 2,
      "createdAt": "2020-01-10T02:05:51.000Z",
      "title": "aliqua aliqua ut aliquip excepteur",
      "body": "Cillum sit dolor veniam laborum pariatur nisi sunt ad veniam dolor in. Deserunt id anim eu mollit dolore reprehenderit cillum. Eiusmod laborum velit adipisicing enim nulla. Ad do et est mollit pariatur nostrud magna in laborum ullamco do do.",
      "spoilers": true,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410878",
              "tagName": "Emotional"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410879",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a241087a",
              "tagName": "Literary Acclaim"
          }
      ],
      "recommended": true,
      "helpfulYes": 4,
      "helpfulNo": 16
  },
  {
      "_id": "5fc5b4e04cafbc35a241087b",
      "author": "Brewer Dean",
      "location": "Virginia",
      "authorReviews": 29,
      "votes": 185,
      "readerType": "Literary Reader",
      "rating": 1,
      "createdAt": "2020-11-15T22:42:39.000Z",
      "title": "in non exercitation et elit",
      "body": "Labore elit voluptate enim tempor incididunt in id aute. Dolor voluptate eu irure id exercitation sit culpa sint nulla excepteur. Tempor laborum ipsum ullamco elit deserunt.",
      "spoilers": true,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a241087c",
              "tagName": "Inspirational"
          },
          {
              "_id": "5fc5b4e04cafbc35a241087d",
              "tagName": "Instagram-able Cover"
          },
          {
              "_id": "5fc5b4e04cafbc35a241087e",
              "tagName": "Couldn't Put It Down"
          }
      ],
      "recommended": false,
      "helpfulYes": 11,
      "helpfulNo": 8
  },
  {
      "_id": "5fc5b4e04cafbc35a241087f",
      "author": "Lucille Sanders",
      "location": "New Jersey",
      "authorReviews": 44,
      "votes": 186,
      "readerType": "On-Trend Reader",
      "rating": 2,
      "createdAt": "2020-07-30T05:08:14.000Z",
      "title": "reprehenderit consectetur nostrud tempor do",
      "body": "Sint mollit laborum nulla velit eiusmod. Pariatur quis commodo duis velit irure nisi culpa nostrud sint quis anim culpa eiusmod. Eiusmod magna laboris sit officia dolore id. Labore exercitation nostrud velit est mollit esse aliquip in duis. Amet velit incididunt aliqua nulla elit esse adipisicing esse exercitation laborum non. Ullamco in ullamco deserunt nisi dolore enim elit labore dolore dolor commodo anim voluptate. Velit nisi eiusmod qui anim amet do elit sit adipisicing adipisicing id.",
      "spoilers": false,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410880",
              "tagName": "Inspirational"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410881",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410882",
              "tagName": "Quick Read"
          }
      ],
      "recommended": false,
      "helpfulYes": 0,
      "helpfulNo": 17
  },
  {
      "_id": "5fc5b4e04cafbc35a2410883",
      "author": "Sandy Campbell",
      "location": "Ohio",
      "authorReviews": 6,
      "votes": 86,
      "readerType": "Non-Fiction Buff",
      "rating": 5,
      "createdAt": "2020-05-30T00:24:12.000Z",
      "title": "id et magna sunt reprehenderit",
      "body": "Mollit esse in id dolor reprehenderit nulla do. Ullamco excepteur ipsum exercitation laboris officia adipisicing aute. Consequat adipisicing ipsum excepteur proident dolor minim deserunt tempor laboris quis nulla ex.",
      "spoilers": true,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410884",
              "tagName": "Emotional"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410885",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410886",
              "tagName": "Literary Acclaim"
          }
      ],
      "recommended": true,
      "helpfulYes": 0,
      "helpfulNo": 20
  },
  {
      "_id": "5fc5b4e04cafbc35a2410887",
      "author": "Susana Chavez",
      "location": "Minnesota",
      "authorReviews": 58,
      "votes": 23,
      "readerType": "On-Trend Reader",
      "rating": 3,
      "createdAt": "2020-10-10T06:30:18.000Z",
      "title": "in enim anim aliqua occaecat",
      "body": "Cupidatat ullamco velit minim ipsum laboris anim anim ex dolor et proident. Ullamco veniam amet mollit esse. Ad elit pariatur nostrud occaecat veniam labore do laboris ullamco.",
      "spoilers": false,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410888",
              "tagName": "Inspirational"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410889",
              "tagName": "Made Me Smarter"
          },
          {
              "_id": "5fc5b4e04cafbc35a241088a",
              "tagName": "Literary Acclaim"
          }
      ],
      "recommended": false,
      "helpfulYes": 16,
      "helpfulNo": 2
  },
  {
      "_id": "5fc5b4e04cafbc35a241088b",
      "author": "Viola Romero",
      "location": "Guam",
      "authorReviews": 77,
      "votes": 49,
      "readerType": "Casual Reader",
      "rating": 1,
      "createdAt": "2020-10-02T01:21:57.000Z",
      "title": "proident nulla magna magna cupidatat",
      "body": "Aliqua tempor incididunt cillum fugiat veniam. Excepteur excepteur Lorem et amet laboris amet ex. Aute duis aute laboris sint incididunt elit ad et anim eiusmod exercitation sit. Nostrud consequat enim non voluptate non consectetur nulla laboris amet labore. Dolor esse esse culpa reprehenderit qui reprehenderit labore pariatur est consectetur fugiat consequat. Cupidatat proident nostrud est mollit sit adipisicing enim do. Est Lorem aute nulla dolore anim fugiat exercitation quis aliqua nisi exercitation pariatur excepteur et.",
      "spoilers": false,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a241088c",
              "tagName": "Emotional"
          },
          {
              "_id": "5fc5b4e04cafbc35a241088d",
              "tagName": "Tear Jerker"
          },
          {
              "_id": "5fc5b4e04cafbc35a241088e",
              "tagName": "Literary Acclaim"
          }
      ],
      "recommended": false,
      "helpfulYes": 1,
      "helpfulNo": 7
  },
  {
      "_id": "5fc5b4e04cafbc35a241088f",
      "author": "Watts Kelly",
      "location": "New Mexico",
      "authorReviews": 32,
      "votes": 132,
      "readerType": "Hopeless Romantic",
      "rating": 5,
      "createdAt": "2020-10-11T08:13:04.000Z",
      "title": "tempor ipsum sunt anim adipisicing",
      "body": "Magna deserunt velit ad adipisicing ut et duis veniam. Magna ipsum eu non anim cupidatat eiusmod laboris proident in deserunt id fugiat sit exercitation. Voluptate ad incididunt excepteur dolor nostrud quis id quis mollit officia sint. Et nisi qui eiusmod elit quis pariatur velit quis cupidatat.",
      "spoilers": true,
      "tags": [
          {
              "_id": "5fc5b4e04cafbc35a2410890",
              "tagName": "Emotional"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410891",
              "tagName": "Instagram-able Cover"
          },
          {
              "_id": "5fc5b4e04cafbc35a2410892",
              "tagName": "Quick Read"
          }
      ],
      "recommended": true,
      "helpfulYes": 8,
      "helpfulNo": 16
  }
]
}