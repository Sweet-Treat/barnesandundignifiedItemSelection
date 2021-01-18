const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

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
  return dummyProduct(isbn); // <-- comment this out once the the row above is uncommented


   // .then((data) => cb(null, data.data))
   // .catch((err) => cb(err))
}


// try running a get request on someone elses endpoint - do an axios request
function getSummaryReview(isbn, cb) {
  console.log('hello from get reviews')
  // commented out the actual get request until other have their servers up and running
  //return axios.get(`http://3.140.58.207/:8000/books/${isbn}/reviews`);
  return dummyReviews(isbn); // <-- comment this out once the the row above is uncommented
//    .then((data) => cb(null, data.data))
//    .catch(() => cb(err))
}

app.get('/product/:id/formats', (req, res) => {
  var id = req.params.id || '9780765326386';
  bookInfo = {}
  Promise.all([getTitleAndAuthor(id), getSummaryReview(id)])
    .then( (results) => {
    console.log('in the then block')
      bookInfo.titleAndAuthor = {
        title: results[0].data.bookTitle,
        author: results[0].data.author,
        publisher: results[0].data.publisherName,
        publicationDate: results[0].data.publicationDate
      };
      var summaryReview = Model.createSummaryReview(results[1].data)
      bookInfo.reviews = summaryReview;

      Books.findOne({isbn: id}, (err, result) => {
          // should refactor to handle the null response
        if (err) {
          console.log('ISBN inventory does not exist')
          res.send();
        } else {
          console.log('ISBN inventory exists')
          if (result === null) {

             console.log('ciao questo e null')
             // hardcoding for the null case to avoid the server to crash
             bookInfo.formats = [ { name: 'Hardcover',
              price: 20,
              discount: 11,
              buyOnlinePickUpInStore: false },
            { name: 'Nook Book',
              price: 6,
              discount: 5,
              buyOnlinePickUpInStore: false },
            { name: 'Audio CD',
              price: 26,
              discount: 6,
              buyOnlinePickUpInStore: true } ]
              res.send();
          } else {
            console.log('hello from here')
            bookInfo.formats = result.formats;
            res.send(bookInfo);
          }

        }
      })
    })
    .catch( () => {
        console.log('in the the catch')
        res.status(400).send();
      })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})


var dummyProduct = function(isbn) {
    var output9781524763169 = {
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
      };
    var output9781571311931 = {
          data: {
            "_id" : "5fcc03a13b16e5adeeb885fe",
            "isbn13" : "9781571311931",
            "author" : "Aimee Nezhukumatathil",
            "bookTitle" : "World of Wonders: In Praise of Fireflies, Whale Sharks, and Other Astonishments (B&N Exclusive Gift Edition)",
            "publisherName" : "Milkweed Editions",
            "publisherLink" : "/publisher",
            "publicationDate" : "2020-12-02T08:00:00Z",
            "series" : "",
            "bookCategory" : "Nonfiction",
            "ageRange" : "",
            "pages" : 184,
            "salesRank" : 311,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "6.50(w) x 1.50(h) x 9.50(d)",
            "__v" : 0
        }
      }
    var output9780765326386 = {
        data: {
            "_id" : "5fcc03a13b16e5adeeb885ff",
            "isbn13" : "9780765326386",
            "author" : "Brandon Sanderson",
            "bookTitle" : "Rhythm of War (Stormlight Archive Series #4)",
            "publisherName" : "Tom Doherty Associates",
            "publisherLink" : "/publisher",
            "publicationDate" : "2020-11-17T08:00:00Z",
            "series" : "Stormlight Archive Series , #4",
            "bookCategory" : "Fiction",
            "ageRange" : "",
            "pages" : 1232,
            "salesRank" : 9,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "6.60(w) x 9.30(h) x 2.30(d)",
            "__v" : 0
        }
    }
    var output9780316187183 = {
        data: {
            "_id" : "5fcc03a13b16e5adeeb88600",
            "isbn13" : "9780316187183",
            "author" : "Joe Abercrombie",
            "bookTitle" : "The Trouble with Peace",
            "publisherName" : "Orbit",
            "publisherLink" : "/publisher",
            "publicationDate" : "2020-09-15T07:00:00Z",
            "series" : "Age of Madness Series , #2",
            "bookCategory" : "Fantasy",
            "ageRange" : "",
            "pages" : 512,
            "salesRank" : 25546,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "6.30(w) x 9.20(h) x 1.70(d)",
            "__v" : 0
        }
    }
    var output9780670020553 = {
        data: {
            "_id" : "5fcc03a13b16e5adeeb88601",
            "isbn13" : "9780670020553",
            "author" : "Lev Grossman",
            "bookTitle" : "The Magicians (Magicians Series #1)",
            "publisherName" : "Penguin Publishing Group",
            "publisherLink" : "/publisher",
            "publicationDate" : "2009-08-11T07:00:00Z",
            "series" : "Magicians Series , #1",
            "bookCategory" : "Graphic novel",
            "ageRange" : "",
            "pages" : 416,
            "salesRank" : 239071,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "6.40(w) x 9.30(h) x 1.40(d)",
            "__v" : 0
        }
    }
    var output9780765386489 = {
        data: {
            "_id" : "5fcc03a13b16e5adeeb88602",
            "isbn13" : "9780765386489",
            "author" : "Michael Johnston",
            "bookTitle" : "Soleri: A Novel",
            "publisherName" : "Tom Doherty Associates",
            "publisherLink" : "/publisher",
            "publicationDate" : "2017-06-13T07:00:00Z",
            "series" : "Amber Throne Series , #1",
            "bookCategory" : "Fantasy",
            "ageRange" : "",
            "pages" : 368,
            "salesRank" : 1255288,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "9.30(w) x 6.40(h) x 1.30(d)",
            "__v" : 0
        }
    }
    var output9781250088482 = {
        data: {
            "_id" : "5fcc03a13b16e5adeeb88603",
            "isbn13" : "9781250088482",
            "author" : "Isabelle Steiger",
            "bookTitle" : "The Empire's Ghost: A Novel",
            "publisherName" : "St. Martin''s Publishing Group",
            "publisherLink" : "/publisher",
            "publicationDate" : "2017-05-16T07:00:00Z",
            "series" : "Paths of Lantistyne , #1",
            "bookCategory" : "Fiction",
            "ageRange" : "",
            "pages" : 432,
            "salesRank" : 451282,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "6.10(w) x 8.70(h) x 1.50(d)",
            "__v" : 0
        }
    }
    var output9780062667632 = {
        data: {
            "_id" : "5fcc03a13b16e5adeeb88605",
            "isbn13" : "9780062667632",
            "author" : "Rumaan Alam",
            "bookTitle" : "Leave the World Behind Alam",
            "publisherName" : "HarperCollins Publishers",
            "publisherLink" : "/publisher",
            "publicationDate" : "2020-10-06T07:00:00Z",
            "series" : "",
            "bookCategory" : "Nonfiction",
            "ageRange" : "",
            "pages" : 256,
            "salesRank" : 399,
            "format" : "",
            "editionDescription" : "",
            "productDimensions" : "6.00(w) x 9.10(h) x 1.10(d)",
            "__v" : 0
        }
    }
      if (isbn === '9781524763169') {return output9781524763169};
      if (isbn === '9781571311931') {return output9781571311931};
      if (isbn === '9780765326386') {return output9780765326386};
      if (isbn === '9780316187183') {return output9780316187183};
      if (isbn === '9780670020553') {return output9780670020553};
      if (isbn === '9780765386489') {return output9780765386489};
      if (isbn === '9781250088482') {return output9781250088482};
      if (isbn === '9780062667632') {return output9780062667632};
      return output9781524763169;
}
// var dummyProduct = {
//   data: {
//     "_id": "5fcc03a13b16e5adeeb885fd",
//     "isbn13": "9781524763169",
//     "author": "Barack Obama",
//     "bookTitle": "A Promised Land",
//     "publisherName": "Crown Publishing Group",
//     "publisherLink": "/publisher",
//     "publicationDate": "2020-11-17T08:00:00.000Z",
//     "series": "",
//     "bookCategory": "Autobiography",
//     "ageRange": "",
//     "pages": 768,
//     "salesRank": 1,
//     "format": "",
//     "editionDescription": "",
//     "productDimensions": "6.40(w) x 9.40(h) x 1.50(d)",
//     "__v": 0
//   }
// }



var dummyReviews = function(isbn) {
    var output9781524763169 = {
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
      };
    var output9781571311931 = {
          data: [
            {
                "_id": "5fc5b4e04cafbc35a2410894",
                "author": "Beryl Mccarty",
                "location": "Palau",
                "authorReviews": 60,
                "votes": 145,
                "readerType": "Hopeless Romantic",
                "rating": 4,
                "createdAt": "2020-09-08T02:56:59.000Z",
                "title": "irure incididunt eu ex cillum",
                "body": "Id incididunt ut eu sint ut pariatur sunt sint aliquip. Sint mollit cupidatat ad minim veniam officia do esse elit ut. Minim exercitation magna ut dolore. Nisi deserunt occaecat exercitation enim labore id qui eiusmod pariatur. Ad laboris tempor dolore do exercitation adipisicing eiusmod adipisicing adipisicing officia eiusmod non exercitation. Sint aute veniam excepteur nulla culpa mollit laborum. Laborum laborum sunt labore qui laboris.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410895",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410896",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410897",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 1,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410898",
                "author": "Corrine Underwood",
                "location": "Missouri",
                "authorReviews": 9,
                "votes": 189,
                "readerType": "Hopeless Romantic",
                "rating": 4,
                "createdAt": "2020-03-15T03:03:39.000Z",
                "title": "pariatur est dolor elit nostrud",
                "body": "Do non Lorem ex minim consequat id fugiat ea adipisicing cillum consequat qui. Reprehenderit excepteur labore dolor velit. Laboris aliquip incididunt fugiat ex ad do anim dolore commodo. Et nisi mollit id id aliquip adipisicing elit incididunt nisi. Qui pariatur nulla incididunt aliquip amet.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410899",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241089a",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241089b",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 0,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a241089c",
                "author": "Vonda Williams",
                "location": "Oklahoma",
                "authorReviews": 58,
                "votes": 14,
                "readerType": "Literary Reader",
                "rating": 1,
                "createdAt": "2020-09-16T02:24:27.000Z",
                "title": "tempor eiusmod deserunt nulla fugiat",
                "body": "Ullamco laborum excepteur excepteur adipisicing Lorem commodo sint aliquip tempor cupidatat. Amet consectetur eu reprehenderit eiusmod sint ullamco mollit exercitation et tempor ea incididunt nisi. Ex officia cillum fugiat culpa dolore fugiat do proident cupidatat dolor. Deserunt commodo amet velit sit adipisicing adipisicing in eiusmod ut Lorem ea irure est. Dolor officia dolore aute sunt amet elit dolore esse labore aliqua pariatur.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241089d",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241089e",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241089f",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 2,
                "helpfulNo": 6
            },
            {
                "_id": "5fc5b4e04cafbc35a24108a0",
                "author": "Shannon Oneal",
                "location": "North Dakota",
                "authorReviews": 31,
                "votes": 3,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-03-26T09:24:42.000Z",
                "title": "enim esse incididunt excepteur nostrud",
                "body": "Occaecat Lorem enim velit sunt dolore. Aliquip do laboris est sit aliquip sit duis non quis laboris irure aliquip. Eiusmod ea exercitation elit duis ea nostrud deserunt excepteur. Labore dolore sint ipsum adipisicing voluptate adipisicing ullamco magna laboris dolor incididunt consequat culpa. Anim dolor commodo elit ullamco aute non Lorem magna magna magna nostrud cupidatat laboris. Consequat elit et ut sit amet Lorem minim in qui ullamco consectetur consequat ullamco.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108a1",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108a2",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108a3",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 3,
                "helpfulNo": 14
            },
            {
                "_id": "5fc5b4e04cafbc35a24108a4",
                "author": "Patrica Byrd",
                "location": "Nebraska",
                "authorReviews": 20,
                "votes": 174,
                "readerType": "On-Trend Reader",
                "rating": 5,
                "createdAt": "2020-05-22T04:38:11.000Z",
                "title": "nostrud aliquip est tempor voluptate",
                "body": "Aliquip sit sunt exercitation aute ut voluptate esse. Consectetur aliqua Lorem ex anim do ipsum ex eu. Ut enim eiusmod aliqua incididunt veniam excepteur laborum nulla ad aute. Ea in qui eiusmod voluptate.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108a5",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108a6",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108a7",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 8,
                "helpfulNo": 8
            },
            {
                "_id": "5fc5b4e04cafbc35a24108a8",
                "author": "Rogers Silva",
                "location": "Massachusetts",
                "authorReviews": 58,
                "votes": 62,
                "readerType": "Non-Fiction Buff",
                "rating": 3,
                "createdAt": "2020-03-16T10:25:51.000Z",
                "title": "cupidatat ut non velit elit",
                "body": "Ut eiusmod enim nulla labore occaecat tempor ipsum veniam aute incididunt anim. Cupidatat non mollit eiusmod sint eu. Irure cupidatat amet et esse ipsum dolor proident fugiat do sit eu elit. Enim proident nisi eu pariatur quis Lorem officia officia dolor anim qui ad. Lorem dolor velit elit aliquip commodo veniam. Velit velit do cillum non pariatur qui amet. Amet cupidatat aute reprehenderit nisi elit.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108a9",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108aa",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ab",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 20,
                "helpfulNo": 14
            },
            {
                "_id": "5fc5b4e04cafbc35a24108ac",
                "author": "Lily Bass",
                "location": "Washington",
                "authorReviews": 51,
                "votes": 177,
                "readerType": "Non-Fiction Buff",
                "rating": 5,
                "createdAt": "2020-04-13T16:13:56.000Z",
                "title": "dolor velit eu laborum esse",
                "body": "Aliquip est aute in consectetur sit. Qui consequat qui adipisicing ea deserunt dolore. Nostrud veniam elit in laborum ut commodo esse mollit incididunt laborum officia voluptate minim nulla. Labore labore duis id ipsum duis velit fugiat ea sit irure nisi cupidatat. Nulla esse laborum elit cillum proident adipisicing. Incididunt id cillum fugiat consequat culpa duis non labore nulla. Tempor pariatur eiusmod reprehenderit nulla Lorem laboris deserunt ullamco do consequat in id anim.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108ad",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ae",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108af",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 3,
                "helpfulNo": 6
            },
            {
                "_id": "5fc5b4e04cafbc35a24108b0",
                "author": "Cassandra Haney",
                "location": "Kansas",
                "authorReviews": 28,
                "votes": 106,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-09-29T18:49:26.000Z",
                "title": "est occaecat qui ea veniam",
                "body": "Irure cillum reprehenderit ex non incididunt laboris amet aute. Quis dolore cillum adipisicing consequat nisi et consequat est. Magna ullamco aute qui velit. Occaecat irure do consectetur veniam id excepteur.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108b1",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108b2",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108b3",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 1,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a24108b4",
                "author": "Payne Blanchard",
                "location": "Hawaii",
                "authorReviews": 55,
                "votes": 62,
                "readerType": "Fiction Lover",
                "rating": 5,
                "createdAt": "2020-10-11T23:57:45.000Z",
                "title": "irure ullamco sint dolore quis",
                "body": "Amet irure aute deserunt commodo voluptate esse reprehenderit pariatur esse veniam cillum irure. Officia ea enim cillum consectetur. Ullamco ut eu minim proident eu.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108b5",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108b6",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108b7",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 1,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a24108b8",
                "author": "Lizzie Preston",
                "location": "New Hampshire",
                "authorReviews": 38,
                "votes": 135,
                "readerType": "On-Trend Reader",
                "rating": 1,
                "createdAt": "2020-05-28T10:54:51.000Z",
                "title": "esse pariatur ullamco tempor consequat",
                "body": "Deserunt laboris est Lorem voluptate dolore sint ea deserunt. Enim magna occaecat aute minim Lorem tempor. Incididunt sit consequat commodo ut Lorem excepteur deserunt reprehenderit deserunt eiusmod. Ipsum laboris velit excepteur proident eiusmod officia et culpa labore anim laborum eu. Adipisicing culpa proident incididunt velit cillum enim nulla.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108b9",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ba",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108bb",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 7
            },
            {
                "_id": "5fc5b4e04cafbc35a24108bc",
                "author": "Sawyer Hale",
                "location": "Oregon",
                "authorReviews": 56,
                "votes": 56,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-03-23T08:56:04.000Z",
                "title": "nostrud ex nulla incididunt fugiat",
                "body": "Lorem sit officia pariatur mollit voluptate tempor laboris nisi aliqua eu. Reprehenderit fugiat sint labore irure nostrud nostrud occaecat ad aute cupidatat aute non amet anim. Mollit quis ea voluptate laborum aliqua amet nostrud nisi do do elit officia mollit. Qui veniam proident incididunt ut ipsum enim labore ullamco minim irure. Adipisicing cillum est duis tempor.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108bd",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108be",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108bf",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 12,
                "helpfulNo": 14
            },
            {
                "_id": "5fc5b4e04cafbc35a24108c0",
                "author": "Kent Osborn",
                "location": "Tennessee",
                "authorReviews": 44,
                "votes": 26,
                "readerType": "Fiction Lover",
                "rating": 2,
                "createdAt": "2020-10-02T07:04:08.000Z",
                "title": "sint anim reprehenderit tempor amet",
                "body": "Nisi adipisicing sit occaecat magna. Aliquip voluptate sit do exercitation irure labore non culpa. Dolore consequat tempor laborum sint deserunt consectetur magna eiusmod. Consectetur voluptate est mollit est occaecat exercitation esse esse. Deserunt proident ipsum ex Lorem pariatur excepteur nostrud.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108c1",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108c2",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108c3",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 7
            },
            {
                "_id": "5fc5b4e04cafbc35a24108c4",
                "author": "Montoya Burris",
                "location": "Delaware",
                "authorReviews": 57,
                "votes": 35,
                "readerType": "Fiction Lover",
                "rating": 3,
                "createdAt": "2020-06-18T07:59:34.000Z",
                "title": "proident amet aliqua aliquip aliqua",
                "body": "Est et incididunt magna cillum minim laborum proident quis voluptate eu laborum. Amet tempor dolor voluptate incididunt. Quis nostrud duis exercitation eiusmod id eu ea aliqua excepteur mollit sunt veniam ipsum minim. Aliqua eu amet labore cillum.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108c5",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108c6",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108c7",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 12,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a24108c8",
                "author": "Valerie Rogers",
                "location": "Louisiana",
                "authorReviews": 34,
                "votes": 78,
                "readerType": "Hopeless Romantic",
                "rating": 1,
                "createdAt": "2020-09-07T02:26:27.000Z",
                "title": "anim incididunt anim ipsum amet",
                "body": "Duis nulla officia sunt dolor ea ipsum fugiat sint sint. Officia id eu dolor ea ipsum ut anim nisi voluptate laborum ipsum dolore mollit commodo. Nisi culpa incididunt nisi eiusmod laborum aute consequat proident labore tempor consequat id occaecat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108c9",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ca",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108cb",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 2,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a24108cc",
                "author": "Snyder Klein",
                "location": "District Of Columbia",
                "authorReviews": 30,
                "votes": 143,
                "readerType": "Casual Reader",
                "rating": 4,
                "createdAt": "2020-08-26T06:04:26.000Z",
                "title": "adipisicing irure nisi sunt velit",
                "body": "Id anim ea irure sunt eiusmod veniam cupidatat ut ad mollit in. Sunt fugiat exercitation officia aute cupidatat nostrud occaecat ipsum non. Ut sunt irure aliquip ex ad ipsum sint ad amet sint cillum fugiat. Aliquip amet eu non in cupidatat anim magna consectetur magna duis officia. Id sint in eu minim cillum veniam ut incididunt non exercitation. Laboris officia dolor aute dolor. Amet in et occaecat deserunt do minim voluptate magna elit aute eu incididunt.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108cd",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ce",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108cf",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 13,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a24108d0",
                "author": "Consuelo Ward",
                "location": "South Carolina",
                "authorReviews": 13,
                "votes": 22,
                "readerType": "Fiction Lover",
                "rating": 5,
                "createdAt": "2020-06-18T08:55:18.000Z",
                "title": "dolore velit proident do duis",
                "body": "Mollit magna velit esse nostrud ex duis ut Lorem do quis. Adipisicing dolore eu et nulla esse deserunt minim. Duis nulla commodo cillum labore elit nostrud sit ullamco do Lorem. Cupidatat ea aute est adipisicing labore quis aliqua mollit occaecat cillum id aliquip dolore id. Pariatur et non magna ullamco minim aute cupidatat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108d1",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108d2",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108d3",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 4,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a24108d4",
                "author": "Bender Parrish",
                "location": "Pennsylvania",
                "authorReviews": 68,
                "votes": 103,
                "readerType": "Book Club Reader",
                "rating": 5,
                "createdAt": "2020-04-30T18:46:00.000Z",
                "title": "aute irure ut non adipisicing",
                "body": "Et consequat ex voluptate do anim proident exercitation magna ea quis do qui mollit. Qui reprehenderit mollit ex laborum sunt et tempor in velit irure. Officia ex excepteur laborum exercitation. Non et exercitation qui laborum nulla proident enim occaecat mollit labore ut nisi quis cupidatat. Voluptate voluptate mollit id officia mollit do id. Duis Lorem minim dolore veniam est aute. Dolor reprehenderit enim tempor culpa ipsum laboris elit magna pariatur irure consequat non nostrud.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108d5",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108d6",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108d7",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 15,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a24108d8",
                "author": "Campbell Workman",
                "location": "Montana",
                "authorReviews": 17,
                "votes": 145,
                "readerType": "Literary Reader",
                "rating": 2,
                "createdAt": "2020-10-30T02:02:06.000Z",
                "title": "cupidatat sit amet quis aliquip",
                "body": "Incididunt consectetur ad proident veniam elit anim elit fugiat excepteur excepteur dolore ipsum mollit. Ea aliquip eu elit labore irure eu culpa qui magna. Nisi nulla dolor nostrud dolore culpa tempor minim. Consequat adipisicing veniam excepteur do aliquip sit in duis officia irure eu aute laboris ad. Nisi ad exercitation cupidatat nulla anim labore magna proident. Reprehenderit aliquip adipisicing anim labore culpa enim.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108d9",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108da",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108db",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 5,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a24108dc",
                "author": "Chandra Garrison",
                "location": "Colorado",
                "authorReviews": 35,
                "votes": 145,
                "readerType": "Non-Fiction Buff",
                "rating": 5,
                "createdAt": "2020-07-01T11:05:24.000Z",
                "title": "cillum occaecat mollit incididunt incididunt",
                "body": "Nulla ullamco non quis ea labore proident. Est eiusmod consectetur sit Lorem velit ullamco in minim. Magna consectetur reprehenderit ea deserunt minim in ex quis laboris anim id velit amet.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108dd",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108de",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108df",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 11,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a24108e0",
                "author": "Gonzales Rivera",
                "location": "Utah",
                "authorReviews": 32,
                "votes": 42,
                "readerType": "On-Trend Reader",
                "rating": 2,
                "createdAt": "2020-01-09T17:06:19.000Z",
                "title": "aliquip do aliqua Lorem tempor",
                "body": "Cupidatat adipisicing pariatur sit enim tempor aliquip magna consequat sint nulla aliqua. Aliquip exercitation enim esse cillum incididunt tempor irure culpa et. Aute esse excepteur cupidatat nostrud amet ad non. Incididunt amet ipsum duis exercitation. Id commodo non id laborum quis veniam.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108e1",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108e2",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108e3",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 17,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a24108e4",
                "author": "Marcella Black",
                "location": "California",
                "authorReviews": 76,
                "votes": 46,
                "readerType": "Literary Reader",
                "rating": 4,
                "createdAt": "2020-03-28T12:32:55.000Z",
                "title": "laboris velit aliqua duis consectetur",
                "body": "In amet in esse ut dolore officia irure ut veniam enim. Nostrud irure voluptate sit incididunt sint. Velit sint consequat ex ex nulla non consectetur cillum eu laboris tempor.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108e5",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108e6",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108e7",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 15,
                "helpfulNo": 2
            },
            {
                "_id": "5fc5b4e04cafbc35a24108e8",
                "author": "Rosalind Mcgowan",
                "location": "West Virginia",
                "authorReviews": 76,
                "votes": 183,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-09-11T04:46:44.000Z",
                "title": "dolor ullamco id aliqua fugiat",
                "body": "Voluptate sit eiusmod consequat voluptate elit. Adipisicing sit et ex fugiat mollit in. Esse sunt laborum qui tempor amet. Amet eu incididunt laboris amet in adipisicing nisi voluptate nisi mollit ipsum sit. Consequat in incididunt et aliqua minim ut minim aliquip nisi ad commodo aliqua. Cillum aliquip Lorem consequat nostrud Lorem aliqua. Tempor labore enim pariatur veniam ullamco dolore magna cupidatat velit.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108e9",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ea",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108eb",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 8,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a24108ec",
                "author": "Bonita Bartlett",
                "location": "South Dakota",
                "authorReviews": 31,
                "votes": 121,
                "readerType": "Hopeless Romantic",
                "rating": 5,
                "createdAt": "2020-04-24T14:28:35.000Z",
                "title": "nisi amet veniam mollit labore",
                "body": "Reprehenderit laborum pariatur amet incididunt dolore incididunt qui adipisicing proident. Sint esse duis eu non consectetur ad consequat sit quis culpa veniam commodo. Proident occaecat ad dolor ea non irure nisi pariatur. Fugiat veniam exercitation proident incididunt in dolor do reprehenderit ea.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108ed",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ee",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ef",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 18,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a24108f0",
                "author": "Lorrie Kelley",
                "location": "Idaho",
                "authorReviews": 60,
                "votes": 151,
                "readerType": "Fiction Lover",
                "rating": 5,
                "createdAt": "2020-10-09T04:07:55.000Z",
                "title": "est ex nisi cupidatat excepteur",
                "body": "Dolore qui labore irure sint enim tempor nisi deserunt adipisicing magna pariatur Lorem. Fugiat proident qui nostrud dolor velit non pariatur ullamco sit voluptate cillum. Non nostrud aute tempor irure tempor ex sit laboris labore amet do. Aliquip dolor dolore veniam magna magna irure magna commodo labore. Ea irure laboris aute nulla est elit magna non nostrud culpa duis. Nulla laboris irure voluptate consectetur proident. Aliqua ad nulla nostrud enim et irure labore.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108f1",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108f2",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108f3",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 4,
                "helpfulNo": 6
            },
            {
                "_id": "5fc5b4e04cafbc35a24108f4",
                "author": "Walter Wyatt",
                "location": "Wyoming",
                "authorReviews": 41,
                "votes": 181,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-10-16T17:11:47.000Z",
                "title": "elit veniam labore consequat eu",
                "body": "Minim ex nostrud ipsum sint tempor aute pariatur cillum. Non ad magna aliqua nisi aliquip mollit amet nisi cupidatat. Enim id incididunt fugiat sunt. In mollit esse nulla magna pariatur aliquip consequat ullamco aliquip laboris labore. Occaecat sunt Lorem exercitation elit mollit esse sint incididunt. Lorem eu ut elit adipisicing.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108f5",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108f6",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108f7",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a24108f8",
                "author": "Staci Browning",
                "location": "Iowa",
                "authorReviews": 61,
                "votes": 159,
                "readerType": "On-Trend Reader",
                "rating": 1,
                "createdAt": "2020-07-14T10:58:08.000Z",
                "title": "non sunt officia dolore cupidatat",
                "body": "Laboris sunt aliqua cillum sit reprehenderit duis excepteur voluptate magna. Consectetur enim in id irure anim nulla minim minim deserunt. Esse aliqua consequat ipsum magna. Proident irure in eu cupidatat aute magna sit laborum aliquip.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108f9",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108fa",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108fb",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 13,
                "helpfulNo": 7
            },
            {
                "_id": "5fc5b4e04cafbc35a24108fc",
                "author": "Charlotte Doyle",
                "location": "Nevada",
                "authorReviews": 17,
                "votes": 37,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-08-22T21:29:50.000Z",
                "title": "id dolor ipsum incididunt in",
                "body": "Nisi proident nostrud laboris ea laborum proident veniam id et nulla. Nisi minim cillum esse sint. Elit reprehenderit laborum consequat pariatur eu cupidatat minim labore est cupidatat nisi.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24108fd",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108fe",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24108ff",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 1,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a2410900",
                "author": "Tameka Clay",
                "location": "Puerto Rico",
                "authorReviews": 29,
                "votes": 100,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-11-18T08:08:19.000Z",
                "title": "id cupidatat Lorem aute qui",
                "body": "Sunt cupidatat ea dolor incididunt duis. Nostrud elit reprehenderit et aliquip dolore anim consectetur nisi sint. Ad aliqua veniam consectetur consequat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410901",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410902",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410903",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 16,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410904",
                "author": "Sophie Hayden",
                "location": "Alaska",
                "authorReviews": 29,
                "votes": 101,
                "readerType": "On-Trend Reader",
                "rating": 1,
                "createdAt": "2020-10-21T08:31:54.000Z",
                "title": "officia velit dolor esse sit",
                "body": "Esse ex laboris incididunt fugiat cupidatat Lorem ullamco adipisicing incididunt. Esse elit exercitation ipsum incididunt esse enim minim aliqua. Eu tempor aliqua officia incididunt mollit irure Lorem voluptate in velit adipisicing non. Officia est ullamco aute mollit sit laborum aliquip ea ullamco duis laboris. Aliqua irure magna officia ut tempor sint reprehenderit aliquip qui occaecat ut do reprehenderit. Ut commodo mollit dolore aliquip non enim. Incididunt nulla reprehenderit cillum deserunt.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410905",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410906",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410907",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 19,
                "helpfulNo": 14
            }
        ]
      }
    var output9780765326386 = {
        data: [
            {
                "_id": "5fc5b4e04cafbc35a2410909",
                "author": "Pacheco Arnold",
                "location": "Illinois",
                "authorReviews": 32,
                "votes": 144,
                "readerType": "Casual Reader",
                "rating": 1,
                "createdAt": "2020-09-25T16:13:48.000Z",
                "title": "sit ut ipsum ex adipisicing",
                "body": "Quis qui deserunt enim minim incididunt commodo ullamco. Amet fugiat proident qui eiusmod eiusmod est reprehenderit. Reprehenderit duis sunt eu do. Occaecat qui tempor culpa Lorem minim culpa veniam cupidatat consequat. Anim enim officia labore est nisi duis Lorem exercitation amet amet adipisicing excepteur. Occaecat tempor sint laboris deserunt eu consequat elit consectetur incididunt.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241090a",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241090b",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241090c",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 18,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a241090d",
                "author": "Lester Cline",
                "location": "Arizona",
                "authorReviews": 22,
                "votes": 82,
                "readerType": "On-Trend Reader",
                "rating": 3,
                "createdAt": "2020-08-22T08:59:31.000Z",
                "title": "in id enim tempor eu",
                "body": "Anim fugiat velit incididunt enim pariatur commodo nisi incididunt aliqua cupidatat aliqua. Reprehenderit nostrud consequat exercitation esse fugiat anim nulla dolore anim. Id anim laboris laboris officia. Id eiusmod nostrud amet adipisicing voluptate enim cillum. Ut nostrud nostrud consequat eu velit. Laboris magna culpa cillum nulla commodo fugiat duis laboris consectetur nulla elit in tempor consectetur. Ut laborum ut qui eiusmod sint anim esse.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241090e",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241090f",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410910",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 8,
                "helpfulNo": 3
            },
            {
                "_id": "5fc5b4e04cafbc35a2410911",
                "author": "Harmon Donaldson",
                "location": "Northern Mariana Islands",
                "authorReviews": 44,
                "votes": 20,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-07-27T06:36:04.000Z",
                "title": "labore ex eiusmod esse excepteur",
                "body": "Do eiusmod enim commodo dolor duis fugiat eiusmod sunt deserunt esse eiusmod aute laborum. Officia in dolor ipsum aute consectetur dolor ad reprehenderit Lorem magna ea ullamco non. Exercitation nulla officia esse sit culpa non est eu elit Lorem non sunt. Sint anim consequat veniam qui quis.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410912",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410913",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410914",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 6,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a2410915",
                "author": "Frye Simmons",
                "location": "North Carolina",
                "authorReviews": 10,
                "votes": 5,
                "readerType": "On-Trend Reader",
                "rating": 5,
                "createdAt": "2020-03-20T20:15:01.000Z",
                "title": "ut mollit aute sint aliqua",
                "body": "Eiusmod labore occaecat est est cillum. Duis cillum cupidatat elit tempor cillum. Velit esse excepteur ea dolore incididunt sunt sit minim. Magna esse nostrud commodo nisi ex. Ipsum magna veniam ipsum excepteur eu duis Lorem ut anim pariatur Lorem eiusmod sit.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410916",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410917",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410918",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 4,
                "helpfulNo": 19
            },
            {
                "_id": "5fc5b4e04cafbc35a2410919",
                "author": "Durham Wade",
                "location": "Alabama",
                "authorReviews": 50,
                "votes": 107,
                "readerType": "Hopeless Romantic",
                "rating": 2,
                "createdAt": "2020-08-22T08:58:53.000Z",
                "title": "labore velit consectetur officia dolore",
                "body": "Eu ut Lorem consectetur laboris velit fugiat aute aliquip cupidatat nulla dolore commodo aliquip. Enim anim veniam pariatur ipsum fugiat. Officia aliqua amet laboris sunt anim officia. Deserunt eu ad non dolor fugiat velit. Culpa do ex aliqua fugiat fugiat Lorem elit voluptate ut adipisicing. Exercitation non id occaecat incididunt sint velit ad nostrud. Esse cupidatat deserunt non ea minim amet sint do dolor non.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241091a",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241091b",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241091c",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 6,
                "helpfulNo": 16
            },
            {
                "_id": "5fc5b4e04cafbc35a241091d",
                "author": "Rosalyn Hancock",
                "location": "American Samoa",
                "authorReviews": 17,
                "votes": 120,
                "readerType": "Casual Reader",
                "rating": 2,
                "createdAt": "2020-07-11T07:01:33.000Z",
                "title": "magna officia ad eiusmod laborum",
                "body": "Commodo ad id minim cillum commodo enim reprehenderit ullamco enim aute enim commodo. Sit id enim in amet excepteur enim aliqua occaecat consequat. Ea mollit est excepteur exercitation esse cillum esse esse.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241091e",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241091f",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410920",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 0,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a2410921",
                "author": "Clark Bond",
                "location": "Virgin Islands",
                "authorReviews": 8,
                "votes": 82,
                "readerType": "Literary Reader",
                "rating": 5,
                "createdAt": "2020-02-03T22:25:19.000Z",
                "title": "laborum exercitation dolor do do",
                "body": "Occaecat ut dolore nostrud labore amet do qui eu reprehenderit anim pariatur adipisicing do minim. Proident consequat incididunt deserunt culpa quis ad fugiat non labore do. Anim adipisicing nulla velit minim magna duis est. In elit occaecat esse tempor. Nisi aliqua exercitation amet sunt laborum et eu proident esse ut labore velit incididunt id. Deserunt non culpa ea cillum irure sunt nostrud.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410922",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410923",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410924",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 3,
                "helpfulNo": 11
            },
            {
                "_id": "5fc5b4e04cafbc35a2410925",
                "author": "Chaney Summers",
                "location": "Vermont",
                "authorReviews": 19,
                "votes": 116,
                "readerType": "Hopeless Romantic",
                "rating": 1,
                "createdAt": "2020-09-06T04:20:55.000Z",
                "title": "commodo laboris proident consectetur exercitation",
                "body": "Duis occaecat amet nostrud elit fugiat. Ut elit sunt dolore minim fugiat dolore aute. Nisi pariatur qui commodo aliquip nulla enim ut officia labore eiusmod anim consequat qui. Laboris tempor elit excepteur enim ullamco commodo ex Lorem nulla incididunt esse duis est minim.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410926",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410927",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410928",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 1,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a2410929",
                "author": "Poole Mcmahon",
                "location": "Indiana",
                "authorReviews": 36,
                "votes": 124,
                "readerType": "Literary Reader",
                "rating": 3,
                "createdAt": "2020-10-26T19:07:54.000Z",
                "title": "id sunt in deserunt reprehenderit",
                "body": "Voluptate officia excepteur ut Lorem excepteur ea enim in elit id fugiat ea deserunt laborum. Cupidatat excepteur aliqua pariatur ipsum sint aute Lorem qui. Ea aute laboris officia do eiusmod pariatur ipsum et anim tempor fugiat officia sit. Lorem velit voluptate sunt veniam sint officia nulla culpa occaecat. Duis occaecat commodo tempor esse cupidatat nulla tempor anim commodo excepteur tempor occaecat est.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241092a",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241092b",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241092c",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 17,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a241092d",
                "author": "Byers Miller",
                "location": "Rhode Island",
                "authorReviews": 19,
                "votes": 21,
                "readerType": "Hopeless Romantic",
                "rating": 4,
                "createdAt": "2020-10-08T18:37:29.000Z",
                "title": "voluptate ad ex dolor aliquip",
                "body": "Laborum occaecat velit cupidatat et officia ad non ex. Dolor nostrud voluptate nostrud cupidatat occaecat sunt excepteur culpa veniam Lorem aute cillum elit labore. Aliquip pariatur ex ullamco cillum dolor quis aliquip officia nostrud officia. Velit incididunt esse cupidatat elit commodo ipsum do fugiat ullamco enim sit. Fugiat laboris et officia laborum. Id est ea et in Lorem eiusmod do Lorem nisi.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241092e",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241092f",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410930",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410931",
                "author": "Aileen Stevenson",
                "location": "Wisconsin",
                "authorReviews": 27,
                "votes": 200,
                "readerType": "Non-Fiction Buff",
                "rating": 5,
                "createdAt": "2020-07-25T03:13:11.000Z",
                "title": "tempor amet quis anim exercitation",
                "body": "Sunt do magna amet ullamco cillum tempor. Dolor esse qui non dolor exercitation ut. Cupidatat anim magna nulla proident enim consequat pariatur ipsum sint aliqua ea tempor excepteur proident. Minim ea reprehenderit aute est adipisicing et nisi fugiat do deserunt ea minim. Non amet magna ex ad aute aliqua. Eu aute labore laboris enim excepteur esse nisi. Voluptate ipsum est aliqua dolore quis ex dolor laboris fugiat commodo pariatur est dolor.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410932",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410933",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410934",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 20,
                "helpfulNo": 16
            },
            {
                "_id": "5fc5b4e04cafbc35a2410935",
                "author": "Kirsten Kidd",
                "location": "Maine",
                "authorReviews": 40,
                "votes": 126,
                "readerType": "Fiction Lover",
                "rating": 2,
                "createdAt": "2020-02-20T11:56:42.000Z",
                "title": "aliqua cupidatat excepteur aute irure",
                "body": "Sint laboris ipsum exercitation nulla enim tempor. Anim laborum occaecat qui ullamco aliqua reprehenderit fugiat anim ut Lorem qui ipsum anim consectetur. Mollit amet consectetur aliquip amet nisi nostrud aute ullamco dolore excepteur ullamco. Elit ea laboris eu veniam sint aute irure irure duis id fugiat anim deserunt do. Eu laboris ipsum mollit in minim sint aliquip.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410936",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410937",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410938",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 8,
                "helpfulNo": 4
            },
            {
                "_id": "5fc5b4e04cafbc35a2410939",
                "author": "Schmidt Goodman",
                "location": "Texas",
                "authorReviews": 6,
                "votes": 147,
                "readerType": "Fiction Lover",
                "rating": 4,
                "createdAt": "2020-05-17T22:08:21.000Z",
                "title": "aliquip mollit cillum sint tempor",
                "body": "Occaecat deserunt dolor cupidatat ullamco anim adipisicing occaecat duis eu ut esse fugiat. Non ex incididunt adipisicing deserunt mollit. Qui duis amet anim consequat elit elit incididunt ex non laboris officia ea.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241093a",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241093b",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241093c",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 0,
                "helpfulNo": 15
            },
            {
                "_id": "5fc5b4e04cafbc35a241093d",
                "author": "Mcdaniel Michael",
                "location": "Federated States Of Micronesia",
                "authorReviews": 29,
                "votes": 150,
                "readerType": "Non-Fiction Buff",
                "rating": 2,
                "createdAt": "2020-03-07T08:29:48.000Z",
                "title": "irure esse veniam est elit",
                "body": "Tempor dolore consequat Lorem nostrud nulla sunt exercitation cupidatat nulla ipsum pariatur velit ut enim. Proident sunt eu ullamco sint et exercitation excepteur laborum. Id consequat quis sunt sunt sunt nulla consequat culpa qui incididunt commodo eu do. Id quis elit aute consectetur nulla ea veniam. Consequat voluptate enim enim veniam est deserunt eu et voluptate ullamco eiusmod id cillum. Voluptate reprehenderit anim laborum voluptate ut officia elit reprehenderit enim laboris excepteur nulla laboris laboris. Irure eiusmod duis irure esse labore sint laborum nostrud veniam cillum ut enim labore sunt.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241093e",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241093f",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410940",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 2,
                "helpfulNo": 1
            },
            {
                "_id": "5fc5b4e04cafbc35a2410941",
                "author": "Kenya Rocha",
                "location": "Mississippi",
                "authorReviews": 46,
                "votes": 199,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-10-27T20:07:30.000Z",
                "title": "ut reprehenderit tempor duis do",
                "body": "Tempor excepteur excepteur Lorem consequat. Ea laborum tempor mollit dolor laboris fugiat quis irure ad minim. Ullamco sint eiusmod esse ullamco occaecat nostrud reprehenderit quis reprehenderit aute.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410942",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410943",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410944",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 7,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a2410945",
                "author": "Malinda Gardner",
                "location": "Connecticut",
                "authorReviews": 62,
                "votes": 109,
                "readerType": "Non-Fiction Buff",
                "rating": 5,
                "createdAt": "2020-01-11T01:27:15.000Z",
                "title": "nulla non excepteur ut cupidatat",
                "body": "Reprehenderit dolore commodo cupidatat consequat sint cupidatat excepteur nostrud incididunt in et et. Commodo commodo nostrud proident quis quis ex ut consectetur laboris dolor Lorem sunt. Velit cupidatat nostrud elit eu in sunt commodo cupidatat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410946",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410947",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410948",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 13,
                "helpfulNo": 2
            },
            {
                "_id": "5fc5b4e04cafbc35a2410949",
                "author": "Dee Cabrera",
                "location": "Maryland",
                "authorReviews": 65,
                "votes": 171,
                "readerType": "On-Trend Reader",
                "rating": 4,
                "createdAt": "2020-06-05T13:12:58.000Z",
                "title": "Lorem labore ex consequat sunt",
                "body": "Adipisicing incididunt do officia magna aute id aliqua cillum magna. Voluptate fugiat et tempor sit ad magna id labore id. In incididunt officia amet dolor proident exercitation fugiat. Dolore proident tempor occaecat aute occaecat est enim consectetur laboris pariatur ex. Labore et do nisi est laborum culpa in sunt sit ad Lorem non sit. Cupidatat incididunt tempor do voluptate ea veniam ipsum occaecat incididunt dolor aliqua incididunt laborum labore. Mollit laborum proident fugiat ipsum duis quis reprehenderit sunt exercitation.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241094a",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241094b",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241094c",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 20,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a241094d",
                "author": "Avila Reynolds",
                "location": "Marshall Islands",
                "authorReviews": 79,
                "votes": 167,
                "readerType": "Literary Reader",
                "rating": 4,
                "createdAt": "2020-06-06T11:32:19.000Z",
                "title": "in in ipsum mollit minim",
                "body": "Cupidatat minim dolor sit magna ea. Irure consequat mollit cupidatat culpa magna incididunt. Nostrud mollit dolore proident dolor sit nostrud et esse. Deserunt deserunt nostrud excepteur nostrud laboris aliquip veniam mollit ex sit id mollit et laborum. Mollit tempor ad tempor aliqua Lorem qui id excepteur eu eiusmod veniam. Lorem consequat tempor deserunt aliqua irure est pariatur fugiat occaecat. Laboris id est adipisicing esse et proident magna laborum Lorem cupidatat ad qui excepteur.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241094e",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241094f",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410950",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 15,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a2410951",
                "author": "Richmond Winters",
                "location": "Arkansas",
                "authorReviews": 24,
                "votes": 28,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-08-22T15:19:28.000Z",
                "title": "officia cupidatat laborum eu id",
                "body": "Elit eiusmod dolor qui duis ullamco nisi nostrud exercitation incididunt non sunt nostrud enim. Eiusmod mollit labore consectetur cillum nisi cillum laboris non incididunt laborum Lorem laborum ad irure. Non esse incididunt voluptate qui laborum. Commodo est Lorem Lorem esse aliqua sit deserunt cupidatat culpa ipsum qui amet. Elit fugiat elit deserunt exercitation incididunt excepteur anim reprehenderit reprehenderit ex amet magna commodo veniam. Et fugiat velit enim veniam adipisicing. Nostrud magna labore ullamco culpa do consequat cupidatat laborum.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410952",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410953",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410954",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 11,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a2410955",
                "author": "Briana Vance",
                "location": "Michigan",
                "authorReviews": 10,
                "votes": 139,
                "readerType": "Literary Reader",
                "rating": 4,
                "createdAt": "2020-04-24T11:38:24.000Z",
                "title": "cupidatat et cupidatat aliqua et",
                "body": "Cupidatat ex aliqua dolor exercitation sit ea voluptate et reprehenderit nisi ad. Dolor magna non adipisicing ex exercitation non et nostrud Lorem ea irure aliqua ex et. Occaecat sit incididunt officia ea sunt eu nisi excepteur esse exercitation.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410956",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410957",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410958",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 3,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410959",
                "author": "Dunn Johnson",
                "location": "Kentucky",
                "authorReviews": 62,
                "votes": 67,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-06-11T18:48:51.000Z",
                "title": "culpa dolore esse deserunt sunt",
                "body": "Dolor nostrud reprehenderit pariatur sunt incididunt veniam. Lorem do adipisicing quis cillum cillum quis do ex Lorem sit proident. Non cillum in dolore exercitation mollit ut aliquip magna ipsum in cillum irure incididunt eu. Consectetur veniam labore qui nostrud deserunt eiusmod voluptate.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241095a",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241095b",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241095c",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 0,
                "helpfulNo": 1
            }
        ]
    }
    var output9780316187183 = {
        data: [
            {
                "_id": "5fc5b4e04cafbc35a241095e",
                "author": "Cherry Joyner",
                "location": "Georgia",
                "authorReviews": 65,
                "votes": 83,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-09-04T11:57:41.000Z",
                "title": "qui deserunt irure aute nulla",
                "body": "Consequat incididunt dolore officia excepteur pariatur aute ipsum proident aute nostrud dolore. Ex sint nulla consequat enim minim consectetur qui aute est adipisicing esse. Aliquip amet cupidatat labore Lorem aute labore ad nostrud. Nisi eu voluptate magna et nisi et enim sit.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241095f",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410960",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410961",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410962",
                "author": "Ines Ayala",
                "location": "New York",
                "authorReviews": 34,
                "votes": 13,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-05-09T05:34:17.000Z",
                "title": "anim cupidatat culpa minim qui",
                "body": "Consequat non voluptate in magna labore laboris dolore magna mollit irure qui et irure ex. Ex eiusmod commodo dolor cillum ad dolore est magna. Culpa Lorem in officia amet eiusmod do adipisicing ea duis qui. Laborum ex ut laborum nulla do. Proident eu veniam laboris magna ut reprehenderit esse amet dolor laborum qui.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410963",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410964",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410965",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 6,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a2410966",
                "author": "Boyer Wolf",
                "location": "Virginia",
                "authorReviews": 20,
                "votes": 38,
                "readerType": "Literary Reader",
                "rating": 2,
                "createdAt": "2020-10-23T16:23:47.000Z",
                "title": "officia ipsum sint eu sit",
                "body": "Reprehenderit enim reprehenderit est fugiat ea. Qui qui sunt qui culpa magna. Proident ea laborum laborum ea ea fugiat enim enim consectetur duis consectetur dolore. Sit sit elit proident irure incididunt culpa dolore id non amet. Consequat qui officia irure esse quis qui. Nulla enim duis id consectetur enim cupidatat non.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410967",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410968",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410969",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a241096a",
                "author": "Katherine Frederick",
                "location": "New Jersey",
                "authorReviews": 24,
                "votes": 158,
                "readerType": "Book Club Reader",
                "rating": 4,
                "createdAt": "2020-01-14T08:48:06.000Z",
                "title": "officia ipsum non aliquip velit",
                "body": "Minim ex consectetur duis veniam aliquip. Sint exercitation officia officia nisi eiusmod aute est cillum eu fugiat exercitation nostrud duis cupidatat. Excepteur minim in laborum velit nisi ea culpa veniam do laborum id dolore. Ipsum sunt reprehenderit occaecat id et officia. Irure dolore proident excepteur magna dolor. Labore eu tempor cupidatat est aute.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241096b",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241096c",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241096d",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 16,
                "helpfulNo": 3
            },
            {
                "_id": "5fc5b4e04cafbc35a241096e",
                "author": "Karen Walsh",
                "location": "Ohio",
                "authorReviews": 63,
                "votes": 119,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-08-28T17:00:27.000Z",
                "title": "deserunt mollit sit officia ut",
                "body": "Cupidatat commodo non nisi incididunt magna laboris deserunt nostrud veniam voluptate. Proident esse ullamco nostrud tempor exercitation ex ex enim incididunt ullamco ad. Quis do irure culpa duis id id amet officia.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241096f",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410970",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410971",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 20,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410972",
                "author": "Richardson Burch",
                "location": "Minnesota",
                "authorReviews": 77,
                "votes": 127,
                "readerType": "Fiction Lover",
                "rating": 3,
                "createdAt": "2020-11-12T00:27:51.000Z",
                "title": "in tempor incididunt cillum non",
                "body": "Amet anim cupidatat esse et labore ipsum sint Lorem officia reprehenderit. Non mollit enim aliquip fugiat reprehenderit. Minim nostrud in qui sit sit minim. Culpa cillum duis mollit aute eiusmod exercitation sunt ea.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410973",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410974",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410975",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 15,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a2410976",
                "author": "Eddie Roberts",
                "location": "Guam",
                "authorReviews": 55,
                "votes": 160,
                "readerType": "Book Club Reader",
                "rating": 3,
                "createdAt": "2020-09-21T12:10:47.000Z",
                "title": "esse incididunt fugiat quis irure",
                "body": "Sunt elit nulla velit sunt mollit labore esse laborum. Cillum in elit consequat ad eiusmod id esse ad sint consequat ea tempor sint. Consequat eiusmod nisi eiusmod minim. Dolor elit pariatur irure ullamco mollit dolore elit Lorem Lorem reprehenderit minim amet aliqua ex. Commodo mollit duis reprehenderit sit occaecat ea irure commodo amet laborum.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410977",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410978",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410979",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a241097a",
                "author": "Paula Hudson",
                "location": "New Mexico",
                "authorReviews": 23,
                "votes": 76,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-08-20T01:58:23.000Z",
                "title": "incididunt deserunt incididunt qui ipsum",
                "body": "Officia ipsum ea veniam laborum minim velit. Dolor commodo consectetur commodo aute tempor sunt labore dolor velit do irure velit sit. Minim reprehenderit eu est dolor magna mollit enim. Adipisicing culpa sint non eiusmod veniam id voluptate voluptate in eu nostrud. Dolore deserunt duis Lorem aliqua amet deserunt magna enim ea Lorem amet nulla. Ad nisi ad elit cillum ex nulla ipsum ut pariatur culpa labore.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241097b",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241097c",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241097d",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 12,
                "helpfulNo": 7
            },
            {
                "_id": "5fc5b4e04cafbc35a241097e",
                "author": "Isabel Ratliff",
                "location": "Palau",
                "authorReviews": 64,
                "votes": 23,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-04-19T23:47:39.000Z",
                "title": "occaecat elit adipisicing veniam nostrud",
                "body": "Ipsum eu proident amet dolore fugiat eu Lorem id veniam excepteur. Ea do sunt ex quis velit. Officia sint velit proident deserunt dolor.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241097f",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410980",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410981",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 18,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a2410982",
                "author": "Hatfield Rios",
                "location": "Missouri",
                "authorReviews": 11,
                "votes": 12,
                "readerType": "Book Club Reader",
                "rating": 3,
                "createdAt": "2020-04-20T19:14:05.000Z",
                "title": "labore in est nulla duis",
                "body": "Fugiat tempor ad irure anim occaecat amet Lorem amet aute minim do nulla incididunt. Culpa et incididunt proident nostrud cupidatat proident ad laboris ullamco minim tempor fugiat fugiat reprehenderit. Officia nulla fugiat sint duis cillum irure incididunt consectetur qui voluptate. Aliquip minim culpa id incididunt dolore deserunt. Exercitation qui est sunt officia occaecat voluptate nostrud et.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410983",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410984",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410985",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 12,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410986",
                "author": "Lang Hobbs",
                "location": "Oklahoma",
                "authorReviews": 46,
                "votes": 173,
                "readerType": "Casual Reader",
                "rating": 1,
                "createdAt": "2020-01-10T16:32:39.000Z",
                "title": "laboris consectetur occaecat id ut",
                "body": "Occaecat consequat laboris veniam eu deserunt officia. Cupidatat amet commodo minim eu enim voluptate aliquip occaecat aliqua deserunt magna. In ea dolor laborum culpa enim pariatur culpa esse. Mollit nulla deserunt fugiat nostrud. Amet ea mollit elit anim. Do voluptate Lorem elit ex ea incididunt in dolor.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410987",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410988",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410989",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 10,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a241098a",
                "author": "Key Morin",
                "location": "North Dakota",
                "authorReviews": 64,
                "votes": 132,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-02-07T06:28:53.000Z",
                "title": "velit velit ea pariatur anim",
                "body": "Est voluptate aliquip incididunt quis in eu id. Consectetur reprehenderit nisi aliqua velit officia dolor eu officia. Reprehenderit qui dolore id officia laborum. Mollit laboris ut pariatur fugiat labore dolor sunt Lorem aute eu. Fugiat aliquip tempor in culpa dolor proident occaecat enim in enim.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241098b",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241098c",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241098d",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 1,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a241098e",
                "author": "Barber Gallegos",
                "location": "Nebraska",
                "authorReviews": 76,
                "votes": 17,
                "readerType": "Fiction Lover",
                "rating": 2,
                "createdAt": "2020-01-06T09:16:10.000Z",
                "title": "ut nulla sunt commodo culpa",
                "body": "Tempor enim officia exercitation sint irure magna tempor incididunt duis. Incididunt qui quis eu esse aliquip aliqua velit magna ea in non. Labore exercitation eiusmod exercitation duis ut qui et ipsum veniam commodo. Excepteur cillum irure velit eu mollit non ex tempor qui culpa excepteur anim minim Lorem.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241098f",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410990",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410991",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 1,
                "helpfulNo": 15
            },
            {
                "_id": "5fc5b4e04cafbc35a2410992",
                "author": "Lesa Saunders",
                "location": "Massachusetts",
                "authorReviews": 67,
                "votes": 139,
                "readerType": "Non-Fiction Buff",
                "rating": 3,
                "createdAt": "2020-07-18T06:29:52.000Z",
                "title": "ipsum consectetur laboris tempor elit",
                "body": "Eiusmod sunt reprehenderit sit velit cillum nisi do ex non eu exercitation eu irure. Nostrud esse id ipsum fugiat do ullamco laboris. Magna aliquip aliqua eiusmod sunt ex occaecat eiusmod. Do dolore ea nulla dolore fugiat sint pariatur enim exercitation cupidatat dolore ut occaecat.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410993",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410994",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410995",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 19,
                "helpfulNo": 2
            },
            {
                "_id": "5fc5b4e04cafbc35a2410996",
                "author": "Black Spencer",
                "location": "Washington",
                "authorReviews": 51,
                "votes": 51,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-10-26T13:31:26.000Z",
                "title": "incididunt quis proident elit fugiat",
                "body": "Ullamco et officia magna Lorem labore excepteur proident velit. Ullamco sunt elit cupidatat minim laborum excepteur Lorem occaecat. Amet laborum ad id occaecat in et tempor ex. Reprehenderit cillum laborum et sunt do ullamco ea quis consequat veniam. Cupidatat deserunt cillum commodo aute. Ex et laborum in sit non adipisicing laborum ea enim proident incididunt consectetur.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410997",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410998",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410999",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 8,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a241099a",
                "author": "Duncan Branch",
                "location": "Kansas",
                "authorReviews": 36,
                "votes": 47,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-05-01T18:40:05.000Z",
                "title": "minim excepteur non officia ea",
                "body": "Pariatur pariatur adipisicing sint ipsum ad irure sint proident laborum minim id pariatur pariatur tempor. Occaecat deserunt laborum proident dolor. Exercitation ad commodo elit aliquip ut magna. Magna minim sunt magna amet consectetur nisi officia minim Lorem nulla officia Lorem. Occaecat minim magna ea tempor ea ea dolor irure ut.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241099b",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241099c",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a241099d",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 0,
                "helpfulNo": 16
            },
            {
                "_id": "5fc5b4e04cafbc35a241099e",
                "author": "Harris Larson",
                "location": "Hawaii",
                "authorReviews": 73,
                "votes": 50,
                "readerType": "Fiction Lover",
                "rating": 2,
                "createdAt": "2020-09-17T18:10:26.000Z",
                "title": "non velit sint non est",
                "body": "Ea incididunt ipsum in eiusmod nulla aliqua. Nostrud duis elit sint laboris fugiat. Proident anim duis fugiat do est.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a241099f",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109a0",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109a1",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 8,
                "helpfulNo": 11
            },
            {
                "_id": "5fc5b4e04cafbc35a24109a2",
                "author": "Baldwin Richmond",
                "location": "New Hampshire",
                "authorReviews": 13,
                "votes": 93,
                "readerType": "Casual Reader",
                "rating": 1,
                "createdAt": "2020-07-31T12:50:40.000Z",
                "title": "veniam est exercitation ea voluptate",
                "body": "Voluptate minim eu commodo reprehenderit minim duis. Anim labore laboris occaecat nisi aliqua veniam cupidatat eiusmod deserunt aute qui. Velit sit commodo do commodo mollit commodo velit cupidatat reprehenderit esse incididunt aliqua in.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109a3",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109a4",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109a5",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 8,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a24109a6",
                "author": "Huff Carpenter",
                "location": "Oregon",
                "authorReviews": 68,
                "votes": 48,
                "readerType": "Casual Reader",
                "rating": 1,
                "createdAt": "2020-10-03T12:27:18.000Z",
                "title": "tempor esse proident nostrud magna",
                "body": "Do in ut aliqua tempor aliquip aliquip ut duis dolor est labore cillum anim aliqua. Deserunt magna aliqua ad duis aute consectetur consequat. Et cupidatat cillum ad deserunt sunt aliquip laboris id aliqua. Mollit sunt occaecat aute labore reprehenderit sunt ullamco tempor. Culpa qui nulla qui occaecat consectetur adipisicing ipsum aliqua ut labore. Esse proident ullamco enim adipisicing voluptate consectetur Lorem nulla commodo pariatur dolor sunt. Incididunt ipsum exercitation officia eu laborum et nostrud proident cupidatat in ad irure officia.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109a7",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109a8",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109a9",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 6,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a24109aa",
                "author": "Hinton Sykes",
                "location": "Tennessee",
                "authorReviews": 6,
                "votes": 21,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-03-30T00:20:56.000Z",
                "title": "id duis qui elit minim",
                "body": "Est cillum sunt laborum ipsum ad id velit in sunt exercitation ad fugiat pariatur proident. Duis consectetur eiusmod consequat aliqua sunt ipsum ut incididunt ad dolore ullamco consectetur. Dolore ut veniam excepteur amet voluptate irure exercitation velit aliqua quis id. Duis ex ullamco dolor aute sint aliquip qui laborum duis aliqua reprehenderit adipisicing quis deserunt. Dolor laborum est reprehenderit adipisicing quis id amet deserunt nostrud proident.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109ab",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ac",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ad",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 13,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a24109ae",
                "author": "Morrow Hampton",
                "location": "Delaware",
                "authorReviews": 12,
                "votes": 126,
                "readerType": "Casual Reader",
                "rating": 4,
                "createdAt": "2020-07-20T05:39:29.000Z",
                "title": "adipisicing aliqua proident eiusmod cupidatat",
                "body": "Consectetur ut et fugiat sint id ea labore excepteur. Nostrud fugiat sit ut esse commodo duis occaecat voluptate deserunt esse. Voluptate in aute velit est. Culpa exercitation culpa officia officia ad exercitation minim reprehenderit eiusmod voluptate aute occaecat. Voluptate aute commodo consequat sit culpa eu occaecat velit cupidatat non amet veniam ipsum. Minim ut aute est duis mollit quis occaecat officia ad ipsum incididunt. Lorem non ea culpa ex dolore incididunt sint sit.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109af",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109b0",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109b1",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a24109b2",
                "author": "Matthews Robles",
                "location": "Louisiana",
                "authorReviews": 50,
                "votes": 111,
                "readerType": "Non-Fiction Buff",
                "rating": 5,
                "createdAt": "2020-02-16T08:20:24.000Z",
                "title": "eiusmod ad irure ipsum laboris",
                "body": "Laborum culpa mollit laboris nulla et adipisicing id sit ut consequat labore. Dolor dolore ex reprehenderit non do. Enim laborum aliquip do qui duis ea ullamco aliquip laboris mollit qui aliqua amet laboris. Veniam officia tempor excepteur ipsum. Occaecat minim ullamco ea cupidatat sit proident laboris ea anim velit et.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109b3",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109b4",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109b5",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 16
            }
        ]
    }
    var output9780670020553 = {
        data: [
            {
                "_id": "5fc5b4e04cafbc35a24109b7",
                "author": "Slater Mcguire",
                "location": "District Of Columbia",
                "authorReviews": 27,
                "votes": 105,
                "readerType": "Fiction Lover",
                "rating": 1,
                "createdAt": "2020-01-15T00:29:22.000Z",
                "title": "do irure consequat ea laboris",
                "body": "Sunt reprehenderit ullamco qui enim ullamco aliqua fugiat consequat irure consequat irure dolore. Sint ipsum magna et exercitation enim anim elit ut esse minim elit exercitation. Eu labore ipsum dolor in excepteur nostrud consectetur. Qui sunt sit sit voluptate cillum proident irure eu mollit ullamco mollit exercitation eu do.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109b8",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109b9",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ba",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 2
            },
            {
                "_id": "5fc5b4e04cafbc35a24109bb",
                "author": "Osborne Maddox",
                "location": "South Carolina",
                "authorReviews": 57,
                "votes": 83,
                "readerType": "Hopeless Romantic",
                "rating": 2,
                "createdAt": "2020-05-21T07:17:43.000Z",
                "title": "adipisicing aute irure officia mollit",
                "body": "Cillum do magna cupidatat adipisicing ut. Eu et mollit ex consectetur voluptate do in deserunt officia quis mollit sit do occaecat. Sunt cupidatat pariatur esse laboris labore velit sunt ex enim nostrud do.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109bc",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109bd",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109be",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 9,
                "helpfulNo": 7
            },
            {
                "_id": "5fc5b4e04cafbc35a24109bf",
                "author": "Padilla Lloyd",
                "location": "Pennsylvania",
                "authorReviews": 32,
                "votes": 19,
                "readerType": "Fiction Lover",
                "rating": 1,
                "createdAt": "2020-05-30T01:52:10.000Z",
                "title": "ut ut velit nisi consequat",
                "body": "Quis est aliquip culpa labore Lorem exercitation est enim magna excepteur dolore fugiat. Aliqua culpa minim et elit eiusmod aliquip veniam anim proident aute consectetur. Pariatur in ad non culpa sunt qui in incididunt minim aute Lorem occaecat cupidatat irure. Eiusmod ullamco aliquip enim ad est et.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109c0",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109c1",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109c2",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 2,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a24109c3",
                "author": "Christy Dalton",
                "location": "Montana",
                "authorReviews": 60,
                "votes": 146,
                "readerType": "Book Club Reader",
                "rating": 3,
                "createdAt": "2020-01-05T00:53:58.000Z",
                "title": "est ea quis ad elit",
                "body": "Dolore id aliqua sunt proident laborum do aute occaecat elit cupidatat laboris magna id velit. Deserunt id anim eu cupidatat do ea culpa esse cupidatat consequat enim cillum irure. Nisi voluptate laborum dolore ad consequat culpa nulla minim. Cupidatat est commodo labore velit consequat laboris et id. Cupidatat cupidatat ipsum id deserunt nisi. Magna aute ut dolor dolore esse deserunt voluptate id anim reprehenderit est sunt ut.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109c4",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109c5",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109c6",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 11,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a24109c7",
                "author": "Pope Sosa",
                "location": "Colorado",
                "authorReviews": 41,
                "votes": 93,
                "readerType": "Non-Fiction Buff",
                "rating": 4,
                "createdAt": "2020-01-18T06:01:54.000Z",
                "title": "culpa adipisicing elit ea labore",
                "body": "Occaecat irure cillum velit reprehenderit. Amet Lorem est dolore enim ex. Qui tempor eiusmod amet occaecat labore cillum ad sit. Ex veniam sit eu pariatur ipsum id reprehenderit in excepteur est qui elit reprehenderit. Duis nulla anim labore id et minim veniam Lorem qui commodo ex. Ea dolor ad nostrud deserunt nisi amet do pariatur non minim amet esse magna duis.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109c8",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109c9",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ca",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 8,
                "helpfulNo": 6
            },
            {
                "_id": "5fc5b4e04cafbc35a24109cb",
                "author": "Loraine Grimes",
                "location": "Utah",
                "authorReviews": 43,
                "votes": 147,
                "readerType": "On-Trend Reader",
                "rating": 3,
                "createdAt": "2020-11-19T22:18:12.000Z",
                "title": "aliqua nostrud nulla cupidatat pariatur",
                "body": "Eiusmod excepteur magna aute dolor duis eu eiusmod. Ipsum pariatur id nisi nisi reprehenderit duis enim amet anim. Lorem occaecat reprehenderit quis fugiat veniam eiusmod cillum nulla quis culpa minim. Magna adipisicing exercitation quis commodo anim sunt mollit fugiat. Labore veniam nostrud proident magna qui reprehenderit veniam. Dolore ex qui cillum enim nulla consectetur do.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109cc",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109cd",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ce",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 18,
                "helpfulNo": 2
            },
            {
                "_id": "5fc5b4e04cafbc35a24109cf",
                "author": "Caldwell Holder",
                "location": "California",
                "authorReviews": 51,
                "votes": 139,
                "readerType": "On-Trend Reader",
                "rating": 3,
                "createdAt": "2020-06-10T17:29:11.000Z",
                "title": "incididunt culpa do ea consectetur",
                "body": "Tempor ex culpa voluptate pariatur ullamco reprehenderit duis nisi enim. Aute exercitation amet elit ad minim exercitation in veniam laboris qui laborum veniam laborum incididunt. Adipisicing voluptate irure et commodo est aute fugiat ad laboris aute aliqua consequat commodo.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109d0",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109d1",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109d2",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 0,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a24109d3",
                "author": "Nixon Dejesus",
                "location": "West Virginia",
                "authorReviews": 34,
                "votes": 103,
                "readerType": "Book Club Reader",
                "rating": 1,
                "createdAt": "2020-04-07T09:52:02.000Z",
                "title": "eiusmod nisi non eu do",
                "body": "Nulla do commodo est proident anim minim irure eiusmod pariatur minim proident sit. Amet sit in esse ullamco enim voluptate nostrud id eiusmod est voluptate fugiat. Consectetur enim adipisicing officia sint cupidatat deserunt exercitation cupidatat eiusmod. Mollit aliquip eiusmod consectetur id exercitation. Pariatur ex magna laborum pariatur.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109d4",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109d5",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109d6",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 4,
                "helpfulNo": 14
            },
            {
                "_id": "5fc5b4e04cafbc35a24109d7",
                "author": "Megan Butler",
                "location": "South Dakota",
                "authorReviews": 25,
                "votes": 186,
                "readerType": "On-Trend Reader",
                "rating": 2,
                "createdAt": "2020-04-01T01:19:39.000Z",
                "title": "labore velit ut fugiat commodo",
                "body": "Exercitation et nostrud non quis pariatur ea. Anim in adipisicing esse dolor est voluptate pariatur ipsum Lorem et et. Elit enim enim aliquip proident amet officia tempor eiusmod non quis cupidatat irure id. Est ea ut exercitation qui sit labore occaecat eiusmod fugiat. Consectetur amet laborum deserunt enim nulla est id ipsum. Pariatur deserunt id fugiat laboris fugiat eu in adipisicing fugiat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109d8",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109d9",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109da",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 15,
                "helpfulNo": 11
            },
            {
                "_id": "5fc5b4e04cafbc35a24109db",
                "author": "Catalina Leach",
                "location": "Idaho",
                "authorReviews": 23,
                "votes": 8,
                "readerType": "On-Trend Reader",
                "rating": 2,
                "createdAt": "2020-07-18T09:08:14.000Z",
                "title": "est adipisicing velit dolore ex",
                "body": "Ipsum minim quis sunt ut amet pariatur. Ex incididunt elit occaecat magna nisi laboris quis voluptate irure magna deserunt minim. Fugiat ea ullamco magna ullamco. Amet fugiat exercitation ex nulla exercitation pariatur proident elit ad anim. Cupidatat consequat eu fugiat dolore mollit eu mollit ipsum sint.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109dc",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109dd",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109de",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 14,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a24109df",
                "author": "Wiley Sweeney",
                "location": "Wyoming",
                "authorReviews": 33,
                "votes": 52,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-10-03T14:31:05.000Z",
                "title": "incididunt ex enim eiusmod sint",
                "body": "Anim excepteur ut est aliquip exercitation dolore sit aute sunt culpa in amet velit. Qui excepteur irure veniam sint ut officia. Aliqua excepteur voluptate cupidatat sint. Aliqua cillum officia minim velit ad ullamco ullamco mollit ad aliquip. Quis eu eu tempor aliquip quis irure Lorem.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109e0",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109e1",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109e2",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 12,
                "helpfulNo": 7
            },
            {
                "_id": "5fc5b4e04cafbc35a24109e3",
                "author": "Weiss Valentine",
                "location": "Iowa",
                "authorReviews": 4,
                "votes": 84,
                "readerType": "On-Trend Reader",
                "rating": 5,
                "createdAt": "2020-08-08T13:30:54.000Z",
                "title": "laboris adipisicing adipisicing duis ut",
                "body": "Lorem duis excepteur et voluptate id eu non magna anim amet minim amet. Commodo magna aliqua fugiat minim irure laborum laboris ad mollit. Esse deserunt proident occaecat veniam magna Lorem fugiat sunt enim do ea. Incididunt consequat tempor fugiat laborum ipsum reprehenderit culpa veniam pariatur quis exercitation eiusmod ex cillum.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109e4",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109e5",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109e6",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 6,
                "helpfulNo": 1
            },
            {
                "_id": "5fc5b4e04cafbc35a24109e7",
                "author": "Brady Herrera",
                "location": "Nevada",
                "authorReviews": 13,
                "votes": 177,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-11-15T23:05:45.000Z",
                "title": "magna ullamco cupidatat adipisicing esse",
                "body": "Lorem exercitation eu cupidatat aliquip Lorem fugiat. Anim occaecat anim do laboris ullamco officia occaecat nulla nisi ex do minim pariatur. Elit ea irure in duis pariatur.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109e8",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109e9",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ea",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 15,
                "helpfulNo": 11
            },
            {
                "_id": "5fc5b4e04cafbc35a24109eb",
                "author": "Debora Neal",
                "location": "Puerto Rico",
                "authorReviews": 33,
                "votes": 62,
                "readerType": "Non-Fiction Buff",
                "rating": 5,
                "createdAt": "2020-05-21T09:56:26.000Z",
                "title": "labore qui nisi esse aute",
                "body": "Non non qui ut laborum in deserunt ut reprehenderit nulla labore aute nisi laboris. Ea aliquip qui ad elit tempor occaecat ea excepteur duis cillum laboris. Sit deserunt ex nostrud deserunt proident non. Amet id consectetur qui deserunt do id ut deserunt. Fugiat officia incididunt reprehenderit deserunt aliqua enim velit elit et veniam. Laborum consequat fugiat nisi aliquip.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109ec",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ed",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109ee",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 16,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a24109ef",
                "author": "Francis Martin",
                "location": "Alaska",
                "authorReviews": 27,
                "votes": 91,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-08-14T21:18:48.000Z",
                "title": "amet ipsum ex aliquip culpa",
                "body": "Cillum cupidatat tempor id exercitation est. Voluptate quis elit ullamco velit mollit consequat aliquip consequat elit ea ut ad. Magna anim ullamco ea ad mollit anim consectetur. Dolore cupidatat ea sit et officia do exercitation Lorem sit ut in. Ipsum laborum laborum sit qui quis elit. Lorem et esse tempor quis laboris elit eiusmod tempor sunt consequat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109f0",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109f1",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109f2",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 1,
                "helpfulNo": 16
            },
            {
                "_id": "5fc5b4e04cafbc35a24109f3",
                "author": "Carey White",
                "location": "Illinois",
                "authorReviews": 26,
                "votes": 13,
                "readerType": "Casual Reader",
                "rating": 2,
                "createdAt": "2020-05-04T19:06:21.000Z",
                "title": "voluptate minim qui anim ex",
                "body": "Aute exercitation voluptate ullamco minim sit ipsum ad consequat anim ea anim velit. Magna consequat consectetur ad ea minim eu amet occaecat. Do nulla ullamco amet nulla consectetur cillum elit nisi consequat ullamco tempor elit. Exercitation enim aliqua amet do laborum consequat ex sit commodo incididunt aute. Esse Lorem pariatur ex elit eiusmod. Aliquip in anim anim proident qui exercitation nostrud adipisicing aute in occaecat irure reprehenderit sit. Nisi laboris elit dolore quis exercitation.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109f4",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109f5",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109f6",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 4,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a24109f7",
                "author": "Tisha Pickett",
                "location": "Arizona",
                "authorReviews": 47,
                "votes": 196,
                "readerType": "Non-Fiction Buff",
                "rating": 2,
                "createdAt": "2020-09-05T18:09:53.000Z",
                "title": "voluptate cillum commodo Lorem excepteur",
                "body": "Officia occaecat ullamco nostrud aliquip do magna do. Ut commodo et ullamco magna enim commodo. Aute culpa in nulla labore do dolore magna. Mollit incididunt laborum exercitation aliqua dolore velit nostrud cillum tempor sint aliqua eu aliquip.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109f8",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109f9",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109fa",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 15,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a24109fb",
                "author": "Shepard Hansen",
                "location": "Northern Mariana Islands",
                "authorReviews": 71,
                "votes": 77,
                "readerType": "Fiction Lover",
                "rating": 5,
                "createdAt": "2020-05-12T18:41:49.000Z",
                "title": "anim do consectetur amet ad",
                "body": "Laborum sit minim non sunt Lorem exercitation dolor eu qui labore amet non officia laboris. Nulla nisi Lorem ea aliquip ullamco aute id cillum magna. Consectetur minim ad qui magna ut.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a24109fc",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109fd",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a24109fe",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 20,
                "helpfulNo": 16
            }
        ]
    }
    var output9780765386489 = {
        data: [
            {
                "_id": "5fc5b4e04cafbc35a2410a00",
                "author": "Esmeralda Buckner",
                "location": "North Carolina",
                "authorReviews": 22,
                "votes": 195,
                "readerType": "Non-Fiction Buff",
                "rating": 4,
                "createdAt": "2020-09-17T04:19:17.000Z",
                "title": "reprehenderit aliquip dolor amet adipisicing",
                "body": "Magna pariatur esse in dolor ullamco. Est voluptate qui duis elit esse laborum ex mollit minim velit sunt enim irure anim. Ex quis id nostrud consectetur enim labore anim do voluptate elit occaecat laborum exercitation. Consectetur fugiat ex qui incididunt sunt aliquip cillum ullamco quis et veniam labore proident. Aliqua Lorem anim sunt dolore.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a01",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a02",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a03",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 3,
                "helpfulNo": 9
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a04",
                "author": "Stephanie Foley",
                "location": "Alabama",
                "authorReviews": 3,
                "votes": 91,
                "readerType": "On-Trend Reader",
                "rating": 5,
                "createdAt": "2020-09-08T00:58:24.000Z",
                "title": "qui proident officia et aliquip",
                "body": "Aute magna dolor velit ex fugiat culpa sunt labore esse non amet elit consequat. Eu aute fugiat labore officia. Pariatur ad quis ad est occaecat. Adipisicing ut culpa est sint irure eiusmod pariatur mollit commodo. Fugiat tempor anim tempor consectetur pariatur cillum qui cillum proident ipsum et pariatur. Proident aute dolor commodo sit aliquip quis consectetur enim. Enim enim velit ut occaecat ipsum esse dolor amet dolore commodo elit anim aute culpa.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a05",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a06",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a07",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 4,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a08",
                "author": "Gladys Bolton",
                "location": "American Samoa",
                "authorReviews": 27,
                "votes": 77,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-02-25T11:09:02.000Z",
                "title": "labore voluptate est officia elit",
                "body": "Est quis duis est laboris id aliqua irure. Amet culpa deserunt occaecat velit tempor duis culpa commodo deserunt pariatur velit. Dolor cupidatat laborum amet sit dolor ipsum anim dolor sunt sint elit in consequat id.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a09",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a0a",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a0b",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 2,
                "helpfulNo": 14
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a0c",
                "author": "Reid Fields",
                "location": "Virgin Islands",
                "authorReviews": 78,
                "votes": 106,
                "readerType": "Fiction Lover",
                "rating": 2,
                "createdAt": "2020-01-05T10:08:46.000Z",
                "title": "culpa veniam qui non nulla",
                "body": "Laboris qui consequat ex ad consequat amet sunt et irure labore. Dolor ea et nisi minim elit occaecat in non esse est labore. Laborum aute sint magna tempor Lorem qui do et magna ullamco quis. Amet pariatur adipisicing officia incididunt. In Lorem voluptate non proident consectetur velit do pariatur ullamco voluptate ad. Reprehenderit reprehenderit anim ad aliqua aliquip occaecat do ea id voluptate. Qui cillum fugiat nisi sunt est ut et incididunt tempor reprehenderit exercitation esse non.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a0d",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a0e",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a0f",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 9,
                "helpfulNo": 14
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a10",
                "author": "Johnson Contreras",
                "location": "Vermont",
                "authorReviews": 41,
                "votes": 79,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-09-11T21:42:49.000Z",
                "title": "reprehenderit elit sunt qui non",
                "body": "Occaecat ex reprehenderit qui voluptate deserunt nisi dolore sit nisi deserunt. Proident consequat elit consequat Lorem magna est occaecat pariatur. Occaecat esse labore id dolor ullamco voluptate voluptate nostrud excepteur non anim sint aliquip. Sunt aute laborum est esse pariatur officia in adipisicing quis eiusmod.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a11",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a12",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a13",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 11,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a14",
                "author": "Henderson Carey",
                "location": "Indiana",
                "authorReviews": 64,
                "votes": 17,
                "readerType": "Hopeless Romantic",
                "rating": 5,
                "createdAt": "2020-01-06T16:18:34.000Z",
                "title": "esse nostrud enim exercitation aute",
                "body": "Exercitation fugiat ut duis incididunt consectetur in ut ad aute. Excepteur sint anim dolore fugiat laborum nostrud consectetur minim quis duis esse incididunt consequat laborum. Voluptate proident ex cillum in elit commodo Lorem ipsum ea do adipisicing fugiat. Id magna ea dolor nulla non ipsum. Non tempor minim aute adipisicing aute amet non. Sunt voluptate nisi mollit quis laborum laboris cupidatat excepteur tempor eu aliqua ea sint.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a15",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a16",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a17",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 19,
                "helpfulNo": 1
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a18",
                "author": "Edith Peters",
                "location": "Rhode Island",
                "authorReviews": 38,
                "votes": 128,
                "readerType": "Casual Reader",
                "rating": 4,
                "createdAt": "2020-06-11T21:36:38.000Z",
                "title": "excepteur laboris consectetur cupidatat voluptate",
                "body": "Tempor amet ipsum exercitation ipsum sit magna anim eu non veniam sint exercitation voluptate. Cupidatat consequat Lorem adipisicing consequat amet. Elit aute fugiat in aliqua in. Sint pariatur qui ea fugiat magna eu irure in proident. Do enim minim sint commodo. In id laboris et mollit officia ex laborum. Culpa aliquip consequat nisi ea sint irure ea ad.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a19",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a1a",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a1b",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 14,
                "helpfulNo": 8
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a1c",
                "author": "Keith Hensley",
                "location": "Wisconsin",
                "authorReviews": 62,
                "votes": 16,
                "readerType": "Non-Fiction Buff",
                "rating": 2,
                "createdAt": "2020-07-25T21:13:40.000Z",
                "title": "consequat sint velit exercitation ut",
                "body": "Elit commodo qui mollit amet deserunt cillum dolor cupidatat esse aute. Reprehenderit minim ullamco culpa officia duis cupidatat aliqua veniam magna labore veniam minim occaecat. Eu et fugiat tempor mollit nisi esse Lorem.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a1d",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a1e",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a1f",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 9,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a20",
                "author": "Tabatha Noel",
                "location": "Maine",
                "authorReviews": 7,
                "votes": 46,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-11-19T21:39:24.000Z",
                "title": "excepteur nisi dolore elit minim",
                "body": "Cillum cillum sint commodo ut do. Enim et ullamco mollit aliquip dolore id in velit sunt cillum do adipisicing. Adipisicing irure culpa in aute officia sint laborum labore sint non. Ullamco qui excepteur adipisicing mollit do labore tempor.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a21",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a22",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a23",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 7,
                "helpfulNo": 3
            }
        ]
    }
    var output9781250088482 = {
        data: [
            {
                "_id": "5fc5b4e04cafbc35a2410a25",
                "author": "Saunders Mason",
                "location": "Texas",
                "authorReviews": 14,
                "votes": 49,
                "readerType": "Fiction Lover",
                "rating": 3,
                "createdAt": "2020-11-10T13:05:54.000Z",
                "title": "magna sit fugiat cupidatat sit",
                "body": "Commodo amet ex et aute voluptate duis velit nulla ut elit cillum. Ullamco eiusmod fugiat mollit incididunt cupidatat laborum minim. Aliqua commodo esse non dolore ex adipisicing ullamco veniam mollit ex tempor velit. Esse sint laboris in dolor pariatur excepteur. Lorem sint aute duis nisi exercitation Lorem non consequat irure Lorem quis Lorem esse.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a26",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a27",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a28",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 0,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a29",
                "author": "Washington Drake",
                "location": "Federated States Of Micronesia",
                "authorReviews": 10,
                "votes": 169,
                "readerType": "Fiction Lover",
                "rating": 5,
                "createdAt": "2020-03-29T02:45:42.000Z",
                "title": "laboris irure culpa laborum irure",
                "body": "Excepteur Lorem laborum exercitation magna adipisicing cillum in fugiat reprehenderit eu do. Laborum mollit incididunt et elit ipsum qui. Nostrud voluptate dolore voluptate commodo non eiusmod amet mollit nostrud.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a2a",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a2b",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a2c",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 16,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a2d",
                "author": "Stark Humphrey",
                "location": "Mississippi",
                "authorReviews": 15,
                "votes": 111,
                "readerType": "Casual Reader",
                "rating": 2,
                "createdAt": "2020-09-24T15:19:41.000Z",
                "title": "ex ex veniam sit non",
                "body": "Consectetur sunt cillum et mollit incididunt sunt. Et anim labore eu deserunt magna mollit ullamco magna cillum consequat duis irure culpa elit. Cupidatat ipsum proident deserunt adipisicing cupidatat eu aliquip id veniam laboris. Minim consectetur ea id qui ea nulla sit ut sint amet dolore fugiat. Eu ullamco ea aliquip nisi Lorem.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a2e",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a2f",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a30",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 16,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a31",
                "author": "Myra Macias",
                "location": "Connecticut",
                "authorReviews": 79,
                "votes": 198,
                "readerType": "Literary Reader",
                "rating": 3,
                "createdAt": "2020-06-10T18:54:00.000Z",
                "title": "ut fugiat magna nulla sunt",
                "body": "Ea eiusmod voluptate incididunt proident deserunt reprehenderit ad. Id consequat tempor esse eu ullamco ullamco. Ea duis nostrud culpa labore commodo ut. Ex consectetur nisi anim consequat incididunt est consequat. Nisi laboris Lorem esse sit labore nostrud Lorem commodo dolor commodo eu labore aute elit.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a32",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a33",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a34",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 11
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a35",
                "author": "Aguilar Wilkins",
                "location": "Maryland",
                "authorReviews": 44,
                "votes": 149,
                "readerType": "Book Club Reader",
                "rating": 3,
                "createdAt": "2020-03-16T07:50:14.000Z",
                "title": "ullamco minim excepteur esse ea",
                "body": "Id reprehenderit Lorem est tempor id deserunt minim nostrud elit. Occaecat sit ea sunt ut reprehenderit. Sunt est ut esse nulla velit nulla cillum nisi laborum nostrud nisi pariatur incididunt. Ea esse adipisicing adipisicing nulla ipsum velit minim in esse. Esse consectetur Lorem ea et culpa. Officia occaecat laborum dolor consequat.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a36",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a37",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a38",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 17,
                "helpfulNo": 4
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a39",
                "author": "Livingston Mercer",
                "location": "Marshall Islands",
                "authorReviews": 72,
                "votes": 54,
                "readerType": "Literary Reader",
                "rating": 1,
                "createdAt": "2020-11-14T18:31:22.000Z",
                "title": "Lorem Lorem exercitation consectetur do",
                "body": "Anim quis irure sint ullamco veniam minim. Elit elit labore id qui officia ullamco. Ullamco aliquip aliquip laboris ut tempor proident consectetur voluptate. Incididunt ut fugiat nulla ex aute. Occaecat est exercitation nostrud in do magna cupidatat reprehenderit eu labore consectetur irure.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a3a",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a3b",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a3c",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 6,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a3d",
                "author": "Wilda Moran",
                "location": "Arkansas",
                "authorReviews": 76,
                "votes": 194,
                "readerType": "Casual Reader",
                "rating": 2,
                "createdAt": "2020-03-27T19:25:31.000Z",
                "title": "aliqua voluptate minim qui tempor",
                "body": "Laborum ad elit consequat elit ipsum eiusmod anim sit veniam voluptate ullamco do. Dolor proident voluptate consequat voluptate elit. Sit ex proident esse non exercitation nisi. Ipsum nisi culpa veniam labore et dolore quis eu aliquip ipsum occaecat. Officia deserunt officia pariatur id nostrud labore sint proident ut id ex ut amet aliquip. Non ut aute tempor non excepteur dolore.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a3e",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a3f",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a40",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 4,
                "helpfulNo": 4
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a41",
                "author": "Rosalinda Hahn",
                "location": "Michigan",
                "authorReviews": 15,
                "votes": 91,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-09-11T02:47:29.000Z",
                "title": "consectetur irure qui sint non",
                "body": "Cupidatat pariatur sit incididunt dolor dolor mollit ea aliqua in officia aliquip. Irure exercitation amet nulla quis veniam commodo exercitation. Deserunt aute laboris adipisicing ex ex Lorem excepteur Lorem tempor. Quis adipisicing esse minim non velit magna.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a42",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a43",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a44",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 3
            }
        ]
    }
    var output9780062667632 = {
        data: [
            {
                "_id": "5fc5b4e04cafbc35a2410a7b",
                "author": "Solis Hill",
                "location": "Nebraska",
                "authorReviews": 64,
                "votes": 106,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-07-02T09:02:00.000Z",
                "title": "et consectetur reprehenderit laboris elit",
                "body": "Dolor est ea amet aliquip. Irure eiusmod pariatur sunt in laborum enim voluptate. Pariatur esse ad mollit irure officia sint exercitation exercitation esse ex magna nulla pariatur. Ea consectetur minim non ut incididunt et do quis. Aliquip aliqua Lorem id anim aliquip incididunt labore sint sunt et tempor culpa. Qui minim fugiat tempor occaecat fugiat sint id occaecat dolor aliquip exercitation.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a7c",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a7d",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a7e",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 13,
                "helpfulNo": 19
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a7f",
                "author": "Shelly Mcintyre",
                "location": "Massachusetts",
                "authorReviews": 77,
                "votes": 37,
                "readerType": "Casual Reader",
                "rating": 4,
                "createdAt": "2020-05-13T07:53:17.000Z",
                "title": "aliquip eiusmod enim est ex",
                "body": "Incididunt ullamco est reprehenderit et aute exercitation sunt ipsum officia amet exercitation velit velit reprehenderit. Mollit voluptate dolor aliqua et officia sint cupidatat mollit in occaecat dolore. Lorem aliqua deserunt velit reprehenderit ea consectetur ullamco reprehenderit ea. Nostrud in commodo nisi Lorem. Excepteur proident aliquip quis sunt ullamco aliquip ut magna. Id laborum ullamco cupidatat eiusmod anim esse. Quis minim velit irure irure sunt Lorem eu.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a80",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a81",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a82",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 13,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a83",
                "author": "Reba Manning",
                "location": "Washington",
                "authorReviews": 45,
                "votes": 6,
                "readerType": "Non-Fiction Buff",
                "rating": 2,
                "createdAt": "2020-07-15T13:59:50.000Z",
                "title": "nulla incididunt ullamco cupidatat quis",
                "body": "Nostrud ex reprehenderit non sint. Excepteur fugiat veniam velit magna in eiusmod magna eu. Adipisicing Lorem amet Lorem eu do do.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a84",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a85",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a86",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 9,
                "helpfulNo": 19
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a87",
                "author": "Penny Poole",
                "location": "Kansas",
                "authorReviews": 38,
                "votes": 102,
                "readerType": "Fiction Lover",
                "rating": 1,
                "createdAt": "2020-07-11T03:37:53.000Z",
                "title": "adipisicing commodo quis dolore aute",
                "body": "Laboris nisi magna dolor consectetur anim aliquip. Reprehenderit voluptate magna officia cillum dolor esse sit enim reprehenderit anim sint aliqua. Velit nostrud dolore et commodo sunt cillum in. Ullamco cillum ut est consequat enim Lorem elit minim in. Fugiat ad officia velit consectetur.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a88",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a89",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a8a",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 1,
                "helpfulNo": 3
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a8b",
                "author": "Lucia Cleveland",
                "location": "Hawaii",
                "authorReviews": 72,
                "votes": 83,
                "readerType": "Literary Reader",
                "rating": 1,
                "createdAt": "2020-04-15T17:18:51.000Z",
                "title": "ea ullamco est enim sint",
                "body": "Anim Lorem sunt laboris occaecat exercitation ex consectetur nulla esse cupidatat esse ea. Culpa excepteur id anim commodo minim. Officia labore culpa anim exercitation eu cupidatat esse qui nostrud sint.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a8c",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a8d",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a8e",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": true,
                "helpfulYes": 10,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a8f",
                "author": "Hoover Odom",
                "location": "New Hampshire",
                "authorReviews": 16,
                "votes": 112,
                "readerType": "Casual Reader",
                "rating": 5,
                "createdAt": "2020-04-26T04:07:45.000Z",
                "title": "irure ex reprehenderit aliquip nostrud",
                "body": "Esse proident deserunt est aute fugiat occaecat. Fugiat commodo pariatur in est aute minim consectetur. Lorem officia Lorem occaecat cillum. Consequat sint sint aliqua et mollit exercitation proident cillum consequat sint labore laborum ullamco in. Et adipisicing nulla qui adipisicing eu dolore ea quis sunt.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a90",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a91",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a92",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 3
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a93",
                "author": "Frederick Castaneda",
                "location": "Oregon",
                "authorReviews": 71,
                "votes": 166,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-01-12T22:03:58.000Z",
                "title": "aute laborum reprehenderit laboris ipsum",
                "body": "Ad laboris Lorem nostrud amet aliquip aute. Et eu sint cillum eiusmod ea non nostrud Lorem. Cupidatat duis laboris velit voluptate incididunt anim commodo. Enim labore et enim sit veniam deserunt laborum aliquip. Et elit irure sunt ipsum consectetur occaecat do voluptate deserunt nulla. Minim anim exercitation ullamco aliquip ullamco aliquip voluptate occaecat cillum officia minim.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a94",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a95",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a96",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 0,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a97",
                "author": "Shepherd Buck",
                "location": "Tennessee",
                "authorReviews": 56,
                "votes": 76,
                "readerType": "Hopeless Romantic",
                "rating": 2,
                "createdAt": "2020-03-21T14:51:43.000Z",
                "title": "aliquip esse commodo aute ea",
                "body": "Commodo velit dolore eu enim consequat est officia commodo et nostrud amet ipsum laborum. Ut sunt eu ad non et ea consequat in. Exercitation laborum sunt aute fugiat id. Duis exercitation sint qui nulla laboris dolor aute adipisicing consectetur enim veniam. Lorem mollit non consectetur nisi consequat ullamco sint exercitation dolore sit eiusmod. Laboris esse nisi magna sint dolor ea ad ullamco.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a98",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a99",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a9a",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 0,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a9b",
                "author": "Ernestine Barnes",
                "location": "Delaware",
                "authorReviews": 72,
                "votes": 146,
                "readerType": "Fiction Lover",
                "rating": 2,
                "createdAt": "2020-11-05T19:42:44.000Z",
                "title": "ad voluptate consequat consequat minim",
                "body": "Qui cupidatat ipsum mollit deserunt minim nostrud consequat pariatur enim in ex. Sunt excepteur ullamco est labore magna id ut tempor. Nostrud enim id eu eiusmod ipsum veniam cillum velit nulla eiusmod nostrud fugiat enim consequat. Amet nulla ad non labore in ullamco esse nostrud fugiat. Duis culpa dolor mollit non. Occaecat voluptate fugiat consequat ullamco labore. Ad culpa eiusmod ad cupidatat et proident nisi non et et ex labore do.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410a9c",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a9d",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410a9e",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 2,
                "helpfulNo": 5
            },
            {
                "_id": "5fc5b4e04cafbc35a2410a9f",
                "author": "Fay Ewing",
                "location": "Louisiana",
                "authorReviews": 63,
                "votes": 155,
                "readerType": "Book Club Reader",
                "rating": 2,
                "createdAt": "2020-11-16T12:40:23.000Z",
                "title": "pariatur incididunt anim ipsum mollit",
                "body": "Ipsum non fugiat aliquip exercitation consequat labore irure reprehenderit nostrud eiusmod enim nisi sit elit. Fugiat amet consequat eu aute commodo sunt officia deserunt do qui tempor reprehenderit. Incididunt officia dolore dolore adipisicing irure.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa0",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa1",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa2",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 17,
                "helpfulNo": 12
            },
            {
                "_id": "5fc5b4e04cafbc35a2410aa3",
                "author": "Jarvis Bright",
                "location": "District Of Columbia",
                "authorReviews": 61,
                "votes": 44,
                "readerType": "Hopeless Romantic",
                "rating": 2,
                "createdAt": "2020-04-20T23:14:47.000Z",
                "title": "nulla adipisicing id mollit proident",
                "body": "Sit aliquip labore labore eu irure ullamco nostrud ex culpa duis adipisicing officia. Duis eiusmod ad eu commodo aliqua do elit. Non aliquip aute dolor exercitation dolor est adipisicing fugiat. Ut laboris et pariatur consequat laboris fugiat sunt consequat velit ad commodo duis. Ad voluptate commodo aliquip ad labore ad velit nisi esse. Culpa ut sit ad fugiat irure proident laboris cillum ipsum.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa4",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa5",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa6",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 14,
                "helpfulNo": 3
            },
            {
                "_id": "5fc5b4e04cafbc35a2410aa7",
                "author": "Shawn Noble",
                "location": "South Carolina",
                "authorReviews": 7,
                "votes": 193,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-07-25T10:13:36.000Z",
                "title": "amet incididunt deserunt reprehenderit anim",
                "body": "Occaecat enim enim aute reprehenderit labore pariatur deserunt eiusmod ut sint consectetur velit ut quis. Exercitation aute consectetur ex fugiat ex officia elit nulla et incididunt mollit esse nisi minim. Eu eiusmod et dolore culpa magna magna proident incididunt dolore aliqua non. Nulla aliqua magna mollit velit aliquip officia sint occaecat ipsum sunt in reprehenderit. Dolore mollit consectetur adipisicing non consequat amet.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa8",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aa9",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aaa",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 16,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410aab",
                "author": "Petersen Cohen",
                "location": "Pennsylvania",
                "authorReviews": 31,
                "votes": 75,
                "readerType": "Book Club Reader",
                "rating": 3,
                "createdAt": "2020-08-21T03:30:17.000Z",
                "title": "deserunt anim ea laboris amet",
                "body": "Labore in ipsum ut fugiat Lorem labore labore consequat duis fugiat esse. Mollit nulla nisi et commodo laboris. Mollit velit officia dolor non dolor adipisicing irure deserunt. Proident nisi voluptate consectetur pariatur. Est aliquip ut cupidatat dolore elit consectetur enim labore ipsum.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410aac",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aad",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aae",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 10,
                "helpfulNo": 0
            },
            {
                "_id": "5fc5b4e04cafbc35a2410aaf",
                "author": "Meadows Davidson",
                "location": "Montana",
                "authorReviews": 54,
                "votes": 5,
                "readerType": "On-Trend Reader",
                "rating": 1,
                "createdAt": "2020-02-05T21:57:59.000Z",
                "title": "sit sit veniam dolore occaecat",
                "body": "Enim consequat ea nisi pariatur officia incididunt mollit ea qui ullamco ipsum ad consectetur. Esse aliquip non irure do nostrud. Duis labore sit proident aliquip. Nulla ipsum ex irure aliqua proident non consectetur labore. Officia excepteur commodo sint est veniam deserunt non excepteur sunt fugiat occaecat. Cillum ad cupidatat ea duis anim proident. Sint commodo veniam aliqua esse voluptate laboris laboris.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab0",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab1",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab2",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 17,
                "helpfulNo": 13
            },
            {
                "_id": "5fc5b4e04cafbc35a2410ab3",
                "author": "Luna Webster",
                "location": "Colorado",
                "authorReviews": 62,
                "votes": 162,
                "readerType": "Non-Fiction Buff",
                "rating": 1,
                "createdAt": "2020-10-18T08:07:27.000Z",
                "title": "quis cillum qui in dolore",
                "body": "Cillum aute adipisicing occaecat mollit do laboris dolor. Do excepteur qui non aliquip id sit consectetur. Cillum in aliquip eiusmod ad magna eu voluptate proident.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab4",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab5",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab6",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 16,
                "helpfulNo": 15
            },
            {
                "_id": "5fc5b4e04cafbc35a2410ab7",
                "author": "Stacie Brock",
                "location": "Utah",
                "authorReviews": 51,
                "votes": 91,
                "readerType": "On-Trend Reader",
                "rating": 5,
                "createdAt": "2020-02-20T19:02:28.000Z",
                "title": "adipisicing id anim proident ex",
                "body": "Ullamco fugiat adipisicing occaecat proident tempor est. Ex eiusmod et ut voluptate voluptate exercitation proident occaecat. Nostrud sunt eiusmod ut irure ex aliqua sint minim ex fugiat ad pariatur ullamco duis.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab8",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ab9",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aba",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 15,
                "helpfulNo": 20
            },
            {
                "_id": "5fc5b4e04cafbc35a2410abb",
                "author": "Elaine Powers",
                "location": "California",
                "authorReviews": 50,
                "votes": 137,
                "readerType": "Casual Reader",
                "rating": 3,
                "createdAt": "2020-06-02T13:18:36.000Z",
                "title": "reprehenderit sunt enim est proident",
                "body": "Laborum reprehenderit tempor exercitation veniam magna deserunt culpa quis. Nostrud fugiat aliquip velit cupidatat aliqua cillum quis incididunt eiusmod sit incididunt reprehenderit eiusmod voluptate. Officia adipisicing do ex incididunt officia incididunt laboris quis nulla aute reprehenderit adipisicing fugiat cillum. Anim enim culpa in laborum dolor. Minim commodo laboris amet culpa. Cillum nisi amet dolore anim dolore enim aliquip nulla aliqua consequat officia commodo.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410abc",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410abd",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410abe",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": true,
                "helpfulYes": 3,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a2410abf",
                "author": "Mccullough Nieves",
                "location": "West Virginia",
                "authorReviews": 3,
                "votes": 13,
                "readerType": "Literary Reader",
                "rating": 4,
                "createdAt": "2020-09-01T15:11:19.000Z",
                "title": "voluptate labore minim sunt ex",
                "body": "Mollit reprehenderit eu cillum excepteur et minim veniam exercitation voluptate consequat. Aliquip aliquip pariatur exercitation consectetur dolore. Est adipisicing dolor do amet cupidatat consequat ipsum id amet veniam duis adipisicing tempor consectetur. Velit eiusmod ullamco quis excepteur commodo. Nisi consectetur ullamco exercitation fugiat consequat.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac0",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac1",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac2",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 2,
                "helpfulNo": 17
            },
            {
                "_id": "5fc5b4e04cafbc35a2410ac3",
                "author": "Madeleine Wolfe",
                "location": "South Dakota",
                "authorReviews": 46,
                "votes": 2,
                "readerType": "Non-Fiction Buff",
                "rating": 2,
                "createdAt": "2020-06-15T01:23:32.000Z",
                "title": "amet id eiusmod sunt et",
                "body": "Reprehenderit veniam deserunt laborum elit quis elit fugiat labore officia excepteur nulla voluptate pariatur. Velit est ea sit ea anim id quis ipsum culpa cupidatat Lorem. Do ullamco deserunt veniam ea nulla dolor exercitation sint.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac4",
                        "tagName": "Laughed Out Loud"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac5",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac6",
                        "tagName": "Quick Read"
                    }
                ],
                "recommended": false,
                "helpfulYes": 16,
                "helpfulNo": 16
            },
            {
                "_id": "5fc5b4e04cafbc35a2410ac7",
                "author": "Good Booker",
                "location": "Idaho",
                "authorReviews": 74,
                "votes": 193,
                "readerType": "Fiction Lover",
                "rating": 4,
                "createdAt": "2020-06-13T03:25:14.000Z",
                "title": "esse commodo ut do consectetur",
                "body": "Culpa mollit incididunt id ea ex ut officia. Mollit non sit ea culpa sunt et culpa incididunt excepteur aliqua. Nulla dolore aute adipisicing cillum sint voluptate id irure veniam pariatur pariatur anim sunt est.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac8",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ac9",
                        "tagName": "Instagram-able Cover"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410aca",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 15,
                "helpfulNo": 18
            },
            {
                "_id": "5fc5b4e04cafbc35a2410acb",
                "author": "Toni Montoya",
                "location": "Wyoming",
                "authorReviews": 59,
                "votes": 48,
                "readerType": "On-Trend Reader",
                "rating": 4,
                "createdAt": "2020-09-20T08:00:53.000Z",
                "title": "enim aute magna anim et",
                "body": "Enim voluptate reprehenderit cillum fugiat fugiat dolore ut quis proident fugiat Lorem ullamco. Mollit non cillum pariatur id enim quis esse ullamco sint tempor. Minim ad mollit incididunt ea ad mollit anim irure. Laborum magna qui reprehenderit fugiat commodo. Cupidatat irure sit dolore aute exercitation sint deserunt quis occaecat anim in ea duis.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410acc",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410acd",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ace",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 1,
                "helpfulNo": 6
            },
            {
                "_id": "5fc5b4e04cafbc35a2410acf",
                "author": "Bianca Lawrence",
                "location": "Iowa",
                "authorReviews": 37,
                "votes": 37,
                "readerType": "Hopeless Romantic",
                "rating": 1,
                "createdAt": "2020-08-24T22:38:32.000Z",
                "title": "commodo nostrud exercitation eu dolore",
                "body": "Eiusmod excepteur laboris commodo non qui nulla. Amet aliqua ad sunt nostrud voluptate ea consequat in anim mollit. Eu non ad amet aliquip enim aliqua est esse amet ut occaecat pariatur dolore. Culpa duis laboris do ipsum. Laborum veniam mollit ullamco duis aute irure sit laboris consequat velit nostrud id.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad0",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad1",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad2",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": true,
                "helpfulYes": 0,
                "helpfulNo": 10
            },
            {
                "_id": "5fc5b4e04cafbc35a2410ad3",
                "author": "Burgess Navarro",
                "location": "Nevada",
                "authorReviews": 19,
                "votes": 158,
                "readerType": "Hopeless Romantic",
                "rating": 3,
                "createdAt": "2020-10-26T20:23:39.000Z",
                "title": "sit ex esse incididunt veniam",
                "body": "Voluptate dolor sunt laborum officia consectetur sint fugiat ex id proident. Aliquip dolor aliqua enim minim pariatur magna reprehenderit duis tempor. Amet eu incididunt adipisicing proident amet sit eiusmod aute non cupidatat in amet.",
                "spoilers": true,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad4",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad5",
                        "tagName": "Tear Jerker"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad6",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 20,
                "helpfulNo": 1
            },
            {
                "_id": "5fc5b4e04cafbc35a2410ad7",
                "author": "Jeanne Morrow",
                "location": "Puerto Rico",
                "authorReviews": 4,
                "votes": 45,
                "readerType": "Literary Reader",
                "rating": 1,
                "createdAt": "2020-04-26T17:51:30.000Z",
                "title": "excepteur culpa enim irure et",
                "body": "Qui quis ullamco ad dolore cillum consectetur eiusmod. Sint anim eiusmod laboris nulla in cupidatat. Nisi ullamco non voluptate aliquip quis ullamco aute proident excepteur eu velit est minim. Culpa sint nisi id pariatur veniam pariatur eiusmod ipsum id cillum exercitation laborum deserunt proident. Enim veniam labore est consequat culpa culpa aliquip enim. Deserunt consequat veniam sunt nulla sit elit fugiat. Qui pariatur magna fugiat ut.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad8",
                        "tagName": "Emotional"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ad9",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ada",
                        "tagName": "Couldn't Put It Down"
                    }
                ],
                "recommended": false,
                "helpfulYes": 19,
                "helpfulNo": 19
            },
            {
                "_id": "5fc5b4e04cafbc35a2410adb",
                "author": "Pratt Lee",
                "location": "Alaska",
                "authorReviews": 68,
                "votes": 64,
                "readerType": "Hopeless Romantic",
                "rating": 4,
                "createdAt": "2020-09-02T11:40:15.000Z",
                "title": "mollit enim amet ex ea",
                "body": "Et officia voluptate cillum ea deserunt in officia laboris duis pariatur. Do excepteur deserunt cupidatat ex exercitation magna pariatur sit sint amet. Dolore cillum elit sunt elit dolor sint et non non consequat fugiat fugiat magna. Dolor qui cupidatat in deserunt. Amet ullamco sit anim enim quis esse voluptate laborum aliquip eu sint nisi. Et Lorem cupidatat dolore proident ex non ullamco aliquip commodo est cupidatat ad. Excepteur quis officia labore magna mollit duis aute exercitation labore consequat.",
                "spoilers": false,
                "tags": [
                    {
                        "_id": "5fc5b4e04cafbc35a2410adc",
                        "tagName": "Inspirational"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410add",
                        "tagName": "Made Me Smarter"
                    },
                    {
                        "_id": "5fc5b4e04cafbc35a2410ade",
                        "tagName": "Literary Acclaim"
                    }
                ],
                "recommended": false,
                "helpfulYes": 5,
                "helpfulNo": 20
            }
        ]
    }

    if (isbn === '9781524763169') {return output9781524763169};
    if (isbn === '9781571311931') {return output9781571311931};
    if (isbn === '9780765326386') {return output9780765326386};
    if (isbn === '9780316187183') {return output9780316187183};
    if (isbn === '9780670020553') {return output9780670020553};
    if (isbn === '9780765386489') {return output9780765386489};
    if (isbn === '9781250088482') {return output9781250088482};
    if (isbn === '9780062667632') {return output9780062667632};
    return output9781524763169;
}
// var dummyReviews = {
//   data: [
//     {
//       "_id": "5fc5b4e04cafbc35a2410863",
//       "author": "Bettye Miles",
//       "location": "Marshall Islands",
//       "authorReviews": 17,
//       "votes": 29,
//       "readerType": "On-Trend Reader",
//       "rating": 1,
//       "createdAt": "2020-06-03T13:29:42.000Z",
//       "title": "officia esse ad anim ut",
//       "body": "Adipisicing anim adipisicing do culpa aliqua minim ullamco elit proident. Aute deserunt nostrud fugiat anim nisi tempor nisi deserunt esse nulla anim aliqua ad. Officia aliquip adipisicing nostrud quis non ut proident. Laborum est minim incididunt reprehenderit laboris ex irure. Nostrud pariatur ipsum cupidatat in. Aute deserunt ex tempor consequat ut nulla non aliqua dolor proident sit ea.",
//       "spoilers": false,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410864",
//               "tagName": "Laughed Out Loud"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410865",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410866",
//               "tagName": "Literary Acclaim"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 17,
//       "helpfulNo": 15
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a2410867",
//       "author": "Freda Adkins",
//       "location": "Arkansas",
//       "authorReviews": 24,
//       "votes": 180,
//       "readerType": "Casual Reader",
//       "rating": 2,
//       "createdAt": "2020-03-19T09:36:51.000Z",
//       "title": "incididunt dolore commodo reprehenderit aliquip",
//       "body": "Lorem eiusmod officia in magna veniam commodo tempor magna et voluptate. Ullamco occaecat nostrud non minim ullamco deserunt. Culpa excepteur aliqua irure nostrud.",
//       "spoilers": true,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410868",
//               "tagName": "Emotional"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410869",
//               "tagName": "Instagram-able Cover"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241086a",
//               "tagName": "Quick Read"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 5,
//       "helpfulNo": 16
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a241086b",
//       "author": "Mae Pugh",
//       "location": "Michigan",
//       "authorReviews": 79,
//       "votes": 35,
//       "readerType": "Casual Reader",
//       "rating": 2,
//       "createdAt": "2020-09-26T03:04:14.000Z",
//       "title": "irure quis amet ullamco quis",
//       "body": "Elit est pariatur ea dolore. Excepteur mollit amet quis esse velit. Cillum non minim aute elit occaecat duis labore qui sit labore. Qui ut qui sint dolor do est ad minim velit officia.",
//       "spoilers": false,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a241086c",
//               "tagName": "Laughed Out Loud"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241086d",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241086e",
//               "tagName": "Quick Read"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 11,
//       "helpfulNo": 1
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a241086f",
//       "author": "Golden George",
//       "location": "Kentucky",
//       "authorReviews": 6,
//       "votes": 74,
//       "readerType": "Casual Reader",
//       "rating": 2,
//       "createdAt": "2020-01-05T22:08:22.000Z",
//       "title": "tempor aliquip sunt aute veniam",
//       "body": "Sint ullamco deserunt pariatur id proident aliquip aliquip do adipisicing exercitation est officia. Adipisicing proident quis ut anim qui dolor sint voluptate consequat est minim. Ex eiusmod voluptate mollit minim labore mollit reprehenderit. Officia consectetur pariatur qui do adipisicing minim sit eiusmod.",
//       "spoilers": true,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410870",
//               "tagName": "Inspirational"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410871",
//               "tagName": "Instagram-able Cover"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410872",
//               "tagName": "Literary Acclaim"
//           }
//       ],
//       "recommended": true,
//       "helpfulYes": 20,
//       "helpfulNo": 13
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a2410873",
//       "author": "Vang Sawyer",
//       "location": "Georgia",
//       "authorReviews": 32,
//       "votes": 188,
//       "readerType": "Book Club Reader",
//       "rating": 4,
//       "createdAt": "2020-02-11T00:16:40.000Z",
//       "title": "in commodo Lorem aliqua velit",
//       "body": "Ut eiusmod irure aute officia deserunt in pariatur amet proident ut proident. Sit ullamco consectetur enim culpa irure sint est occaecat ut anim. Eu ad minim deserunt eu cillum amet consequat non in ut proident. Nostrud ea amet ex amet fugiat eu dolore duis aute exercitation Lorem. Non deserunt mollit dolor ad fugiat ad dolore.",
//       "spoilers": false,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410874",
//               "tagName": "Laughed Out Loud"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410875",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410876",
//               "tagName": "Quick Read"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 12,
//       "helpfulNo": 15
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a2410877",
//       "author": "Estela Wagner",
//       "location": "New York",
//       "authorReviews": 78,
//       "votes": 122,
//       "readerType": "Hopeless Romantic",
//       "rating": 2,
//       "createdAt": "2020-01-10T02:05:51.000Z",
//       "title": "aliqua aliqua ut aliquip excepteur",
//       "body": "Cillum sit dolor veniam laborum pariatur nisi sunt ad veniam dolor in. Deserunt id anim eu mollit dolore reprehenderit cillum. Eiusmod laborum velit adipisicing enim nulla. Ad do et est mollit pariatur nostrud magna in laborum ullamco do do.",
//       "spoilers": true,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410878",
//               "tagName": "Emotional"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410879",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241087a",
//               "tagName": "Literary Acclaim"
//           }
//       ],
//       "recommended": true,
//       "helpfulYes": 4,
//       "helpfulNo": 16
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a241087b",
//       "author": "Brewer Dean",
//       "location": "Virginia",
//       "authorReviews": 29,
//       "votes": 185,
//       "readerType": "Literary Reader",
//       "rating": 1,
//       "createdAt": "2020-11-15T22:42:39.000Z",
//       "title": "in non exercitation et elit",
//       "body": "Labore elit voluptate enim tempor incididunt in id aute. Dolor voluptate eu irure id exercitation sit culpa sint nulla excepteur. Tempor laborum ipsum ullamco elit deserunt.",
//       "spoilers": true,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a241087c",
//               "tagName": "Inspirational"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241087d",
//               "tagName": "Instagram-able Cover"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241087e",
//               "tagName": "Couldn't Put It Down"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 11,
//       "helpfulNo": 8
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a241087f",
//       "author": "Lucille Sanders",
//       "location": "New Jersey",
//       "authorReviews": 44,
//       "votes": 186,
//       "readerType": "On-Trend Reader",
//       "rating": 2,
//       "createdAt": "2020-07-30T05:08:14.000Z",
//       "title": "reprehenderit consectetur nostrud tempor do",
//       "body": "Sint mollit laborum nulla velit eiusmod. Pariatur quis commodo duis velit irure nisi culpa nostrud sint quis anim culpa eiusmod. Eiusmod magna laboris sit officia dolore id. Labore exercitation nostrud velit est mollit esse aliquip in duis. Amet velit incididunt aliqua nulla elit esse adipisicing esse exercitation laborum non. Ullamco in ullamco deserunt nisi dolore enim elit labore dolore dolor commodo anim voluptate. Velit nisi eiusmod qui anim amet do elit sit adipisicing adipisicing id.",
//       "spoilers": false,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410880",
//               "tagName": "Inspirational"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410881",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410882",
//               "tagName": "Quick Read"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 0,
//       "helpfulNo": 17
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a2410883",
//       "author": "Sandy Campbell",
//       "location": "Ohio",
//       "authorReviews": 6,
//       "votes": 86,
//       "readerType": "Non-Fiction Buff",
//       "rating": 5,
//       "createdAt": "2020-05-30T00:24:12.000Z",
//       "title": "id et magna sunt reprehenderit",
//       "body": "Mollit esse in id dolor reprehenderit nulla do. Ullamco excepteur ipsum exercitation laboris officia adipisicing aute. Consequat adipisicing ipsum excepteur proident dolor minim deserunt tempor laboris quis nulla ex.",
//       "spoilers": true,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410884",
//               "tagName": "Emotional"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410885",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410886",
//               "tagName": "Literary Acclaim"
//           }
//       ],
//       "recommended": true,
//       "helpfulYes": 0,
//       "helpfulNo": 20
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a2410887",
//       "author": "Susana Chavez",
//       "location": "Minnesota",
//       "authorReviews": 58,
//       "votes": 23,
//       "readerType": "On-Trend Reader",
//       "rating": 3,
//       "createdAt": "2020-10-10T06:30:18.000Z",
//       "title": "in enim anim aliqua occaecat",
//       "body": "Cupidatat ullamco velit minim ipsum laboris anim anim ex dolor et proident. Ullamco veniam amet mollit esse. Ad elit pariatur nostrud occaecat veniam labore do laboris ullamco.",
//       "spoilers": false,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410888",
//               "tagName": "Inspirational"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410889",
//               "tagName": "Made Me Smarter"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241088a",
//               "tagName": "Literary Acclaim"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 16,
//       "helpfulNo": 2
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a241088b",
//       "author": "Viola Romero",
//       "location": "Guam",
//       "authorReviews": 77,
//       "votes": 49,
//       "readerType": "Casual Reader",
//       "rating": 1,
//       "createdAt": "2020-10-02T01:21:57.000Z",
//       "title": "proident nulla magna magna cupidatat",
//       "body": "Aliqua tempor incididunt cillum fugiat veniam. Excepteur excepteur Lorem et amet laboris amet ex. Aute duis aute laboris sint incididunt elit ad et anim eiusmod exercitation sit. Nostrud consequat enim non voluptate non consectetur nulla laboris amet labore. Dolor esse esse culpa reprehenderit qui reprehenderit labore pariatur est consectetur fugiat consequat. Cupidatat proident nostrud est mollit sit adipisicing enim do. Est Lorem aute nulla dolore anim fugiat exercitation quis aliqua nisi exercitation pariatur excepteur et.",
//       "spoilers": false,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a241088c",
//               "tagName": "Emotional"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241088d",
//               "tagName": "Tear Jerker"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a241088e",
//               "tagName": "Literary Acclaim"
//           }
//       ],
//       "recommended": false,
//       "helpfulYes": 1,
//       "helpfulNo": 7
//   },
//   {
//       "_id": "5fc5b4e04cafbc35a241088f",
//       "author": "Watts Kelly",
//       "location": "New Mexico",
//       "authorReviews": 32,
//       "votes": 132,
//       "readerType": "Hopeless Romantic",
//       "rating": 5,
//       "createdAt": "2020-10-11T08:13:04.000Z",
//       "title": "tempor ipsum sunt anim adipisicing",
//       "body": "Magna deserunt velit ad adipisicing ut et duis veniam. Magna ipsum eu non anim cupidatat eiusmod laboris proident in deserunt id fugiat sit exercitation. Voluptate ad incididunt excepteur dolor nostrud quis id quis mollit officia sint. Et nisi qui eiusmod elit quis pariatur velit quis cupidatat.",
//       "spoilers": true,
//       "tags": [
//           {
//               "_id": "5fc5b4e04cafbc35a2410890",
//               "tagName": "Emotional"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410891",
//               "tagName": "Instagram-able Cover"
//           },
//           {
//               "_id": "5fc5b4e04cafbc35a2410892",
//               "tagName": "Quick Read"
//           }
//       ],
//       "recommended": true,
//       "helpfulYes": 8,
//       "helpfulNo": 16
//   }
// ]
// }