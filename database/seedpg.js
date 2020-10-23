const client = require('./index.js')
const path = require('path');
const { performance } = require('perf_hooks');


const reviewsLocation = path.join(__dirname, '../data/reviews1M.csv');



const copyReviewsCSV = `
  COPY reviews1M from '${reviewsLocation}' DELIMITER ',' csv header;
`;

const createReviewsTable = `
  CREATE TABLE IF NOT EXISTS reviews1M (
    reviewId int primary key,
    username varchar,
    productId int,
    title varchar(100),
    body varchar,
    createdAt date,
    wouldRecommend boolean,
    overall int,
    comfort int,
    style int,
    value int,
    sizing int,
    helpfulVotes int
  );
`;

const reviewIdSquence = `
  CREATE SEQUENCE reviews1M_sequence start 1000000 increment 1;
`
const createIndex = `
  CREATE INDEX idx_reviews1M_productId on reviews(productId);
`

var t0 = performance.now();

client
  .query(createReviewsTable)
  .then(() => {
    console.log('Reviews table is successfully created')
  })
  .then(() => {
    client.query(copyReviewsCSV)
    .then(() => {
      console.log('Reviews added to reviews table')
      var t1 = performance.now();
      var seedTime = t1 - t0;
      console.log(`It took ${seedTime} milliseconds (${seedTime/60000} minutes) to seed the postgresql database.`)
    })
    .then(() => {
      client.query(reviewIdSquence)
      .then(() => {
        console.log('Newly inserted reviews will begin at reviewsid 1000001')
      })
      .then(() => {
        var t2 = performance.now();
        client.query(createIndex)
        .then(() => {
          console.log('Index created for productId to optimize querying time')
          var t3 = performance.now();
          var indexTime = t3 - t2;
          console.log(`It took ${indexTime} milliseconds (${indexTime/60000} minutes) to index the product id column.`)
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          client.end()
        })
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  })
  .catch(err => {
    console.error(err);
  })