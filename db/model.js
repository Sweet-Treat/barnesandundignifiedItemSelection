// create Summary review
var createSummaryReview = (data) => {
  var reviewSum = 0;
  var reviewsCount = {
    star1: 0,
    star2: 0,
    star3: 0,
    star4: 0,
    star5: 0
  }
  var totalReviews = 0;
  var totalRating = 0;
  // loop over the array
  for (var i = 0; i < data.length; i++) {
    if (data[i].rating === 1) {
      reviewsCount.star1++;

    } else if (data[i].rating === 2) {
      reviewsCount.star2++;
    } else if (data[i].rating === 3) {
      reviewsCount.star3++;
    } else if (data[i].rating === 4) {
      reviewsCount.star4++;
    } else if (data[i].rating === 5) {
      reviewsCount.star5++;
    }
    reviewSum += data[i].rating;
  }

  var rating1 = {
    stars: 1,
    percentage: Number((reviewsCount.star1 / data.length).toFixed(2))*100,
    numberReviews: reviewsCount.star1
  }
  var rating2 = {
    stars: 2,
    percentage: Number((reviewsCount.star2 / data.length).toFixed(2))*100,
    numberReviews: reviewsCount.star2
  }
  var rating3 = {
    stars: 3,
    percentage: Number((reviewsCount.star3 / data.length).toFixed(2))*100,
    numberReviews: reviewsCount.star3
  }
  var rating4 = {
    stars: 4,
    percentage: Number((reviewsCount.star4 / data.length).toFixed(2))*100,
    numberReviews: reviewsCount.star4
  }
  var rating5 = {
    stars: 5,
    percentage: Number((reviewsCount.star5 / data.length).toFixed(2))*100,
    numberReviews: reviewsCount.star5
  }


  var result = {
    totalReviews: data.length,
    avgRating: reviewSum/ data.length,
    starsEach: [rating5, rating4, rating3, rating2, rating1]

  }
  return result;
}

module.exports.createSummaryReview = createSummaryReview;