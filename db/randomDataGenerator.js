const mongoose = require('mongoose');
const Book = require('./index.js');

// generate random data in line with the shape required by the Mongo collection


// helper function that generates a random int between min and max - from MdN
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// helper function that generates random words
function randomWord (len) {
  var letters = 'abcdefghijklmnopqrstuvwxyz';
  // define an output empty string
  var result = '';
  // loop length times
  for (var i = 0; i < len; i++) {
    var randomIndex = getRandomInt(0, letters.length);
    result = result + letters[randomIndex];
  }
  return result;
}

// helper function that generates a random real number between min and max - from MdN
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// helper function to generate a random boolean
function getRandomBool() {
  var random = getRandomArbitrary(0, 1);
  return (random > 0.5 ? true : false);
}



// function that generates random data based on my schema

function randomDataGenerator(records) {
  var testData = [];
  for (var i = 0; i < records; i++) {
    var currentObject = {};

    // generate a unique isbn for the current collection record
    // hard code the first 10 ISBNs to align with other
    if ( i === 0) { currentObject.isbn = "9780062667632"; }
    else if ( i === 1) { currentObject.isbn = "9780316187183"; }
    else if ( i === 2) { currentObject.isbn = "9780670020553"; }
    else if ( i === 3) { currentObject.isbn = "9780765326386"; }
    else if ( i === 4) { currentObject.isbn = "9780765386489"; }
    else if ( i === 5) { currentObject.isbn = "9780812996708"; }
    else if ( i === 6) { currentObject.isbn = "9781250088482"; }
    else if ( i === 7) { currentObject.isbn = "9781524763169"; }
    else if ( i === 8) { currentObject.isbn = "9781571311931"; }
    else if ( i === 9) { currentObject.isbn = "9781594633294"; }
    else { currentObject.isbn = i.toString(); }

    // generate a title for the current collection record
    // var title = '';
    // var wordsInTitle = getRandomInt(1, 8);
    // for (var j = 0; j < wordsInTitle; j++) {
    //   title = title + ' ' + randomWord(getRandomInt(1, 10));
    // }
    // currentObject.title = title;

    // generate an author
    // currentObject.author = randomWord(getRandomInt(3, 9)) + ' ' + randomWord(getRandomInt(3, 10));

    // generate a reviews object
    // currentObject.reviews = {};
    // currentObject.reviews.score = getRandomArbitrary(0, 5);
    // currentObject.reviews.number = getRandomInt(1, 1500);

    // create an objects array
    currentObject.formats =[];
    currentObject.formats[0] = {};
    currentObject.formats[0].name = 'Hardcover';
    currentObject.formats[0].price = getRandomInt(5, 35);
    currentObject.formats[0].discount = getRandomInt(0, 20);
    currentObject.formats[0].buyOnlinePickUpInStore = getRandomBool();

    currentObject.formats[1] = {};
    currentObject.formats[1].name = 'Nook Book';
    currentObject.formats[1].price = getRandomInt(5, 35);
    currentObject.formats[1].discount = getRandomInt(0, 20);
    currentObject.formats[1].buyOnlinePickUpInStore = getRandomBool();

    if (getRandomBool()) {
      var paperbackOption = {};
      paperbackOption.name = 'Paperback';
      paperbackOption.price = getRandomInt(5, 35);
      paperbackOption.discount = getRandomInt(0, 20);
      paperbackOption.buyOnlinePickUpInStore = getRandomBool();
      currentObject.formats.push(paperbackOption);
    }

    if (getRandomBool()) {
      var signedbookOption = {};
      signedbookOption.name = 'Signed Book';
      signedbookOption.price = getRandomInt(5, 35);
      signedbookOption.discount = getRandomInt(0, 20);
      signedbookOption.buyOnlinePickUpInStore = getRandomBool();
      currentObject.formats.push(signedbookOption);
    }

    if (getRandomBool()) {
      var audioCDOption = {};
      audioCDOption.name = 'Audio CD';
      audioCDOption.price = getRandomInt(5, 35);
      audioCDOption.discount = getRandomInt(0, 20);
      audioCDOption.buyOnlinePickUpInStore = getRandomBool();
      currentObject.formats.push(audioCDOption);
    }
    testData.push(currentObject);
    //console.log('i',i)
    //console.log('testData', testData);

  }
  return testData;
}

var sampleData = randomDataGenerator(1000);
console.log('sampleData', sampleData);

var insertBooks = function() {
  Book.insertMany(sampleData, (err, docs) => {
    if (err) {
      console.log('there was an error');
      mongoose.connection.close();
    } else {
      console.log('insert complete');
     // console.log('docs', docs);
      mongoose.connection.close();
    }

  })
};

insertBooks();