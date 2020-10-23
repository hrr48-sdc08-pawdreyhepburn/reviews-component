const faker = require('faker');
const fs = require('fs');
const { performance } = require('perf_hooks');


function createReviews(numOfReviews) {
  var totalReviews = numOfReviews;
  var start = performance.now();
  const writeReviews = fs.createWriteStream('../data/reviews.csv');
  writeReviews.write('reviewId,username,productId,title,body,createdAt,wouldRecommend,overall,comfort,style,value,sizing,helpfulVotes\n', 'utf8');

  const products = {min: 0, max: 10000000};
  const stars = {min: 1, max: 5}
  const helpful = {min: 0, max: 20};
  let reviewId = 0;

  function createReview() {
    let ok = true;
    do {
      numOfReviews -= 1;
      reviewId++;

      const d = faker.date.between('2020-07-01', '2020-10-01');
      const username = faker.internet.userName();
      const productId = faker.random.number(products);
      const title =  faker.lorem.words(3);
      const body = faker.lorem.paragraph();
      const createdAt = d.toISOString().substring(0, 10);
      const wouldRecommend = faker.random.boolean();
      const overall = faker.random.number(stars);
      const comfort = faker.random.number(stars);
      const style = faker.random.number(stars);
      const value = faker.random.number(stars);
      const sizing = faker.random.number(stars);
      const helpfulVotes = faker.random.number(helpful);

      const review = `${reviewId},${username},${productId},${title},${body},${createdAt},${wouldRecommend},${overall},${comfort},${style},${value},${sizing},${helpfulVotes}\n`
      if (numOfReviews === 0) {
        writeReviews.write(review, 'utf8', () => {
          writeReviews.end();
          var end = performance.now()
          var time = end - start;
          console.log(`It took ${time/1000} seconds to generate ${totalReviews/1000000}M reviews.`)
        });
      } else {
        ok = writeReviews.write(review, 'utf8');
      }
    } while(numOfReviews > 0 && ok);
    if (numOfReviews > 0 ) {
      writeReviews.once('drain', createReview)
    }
  }
  createReview()
}

createReviews(100000000);