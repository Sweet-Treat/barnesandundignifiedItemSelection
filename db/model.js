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
  var result = {
    totalReviews: data.length,
    avgRating: reviewSum/ data.length,
    reviewsCount: reviewsCount
  }
  return result;
}

module.exports.createSummaryReview = createSummaryReview;