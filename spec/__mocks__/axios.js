export default {
  get: jest.fn(() => Promise.resolve({ data: {
    "titleAndAuthor": {
        "title": "A Promised Land",
        "author": "Barack Obama"
    },
    "reviews": {
        "totalReviews": 27,
        "avgRating": 1.9
    },
    "formats": [
        {
            "name": "Hardcover",
            "price": 28,
            "discount": 4,
            "buyOnlinePickUpInStore": false
        },
        {
            "name": "Nook Book",
            "price": 25,
            "discount": 19,
            "buyOnlinePickUpInStore": false
        },
        {
            "name": "Audio CD",
            "price": 17,
            "discount": 1,
            "buyOnlinePickUpInStore": true
        }
    ]
} }))
};