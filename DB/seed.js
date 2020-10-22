var faker = require('faker');
var db = require('./db.js');
var mongoose = require('mongoose');
var Reviews = require('./Reviews.js');

var generateIds = function (num) {
  var array = [];
  for (var i = 1; i <= num; i++ ) {
    array.push(i);
  }
  return array;
};

var productIds = generateIds(100);

var generateReviews = function(numReviews) {
  var data = [];
  // var uniq = 0;
  var counter = 0;

  var stars = {
    'min': 1,
    'max': 5
  };
  var sizing = {
    'min': 1,
    'max': 3
  };

  function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  for (var i = 0; i < numReviews; i++) {
    counter++;
    var d = faker.date.between('2020-07-01', '2020-10-30');
    var fakeReview = {
      author: faker.name.firstName(),
      stars: faker.random.number(stars), // 0 through 5
      body: faker.lorem.paragraph(),
      // createdAt: randomDate(new Date("2020-09-15T20:44:19.172Z"), new Date("2020-10-01T20:44:19.172Z")), // date
      createdAt: d.toISOString().substring(0, 10),
      wouldRecommend: faker.random.boolean(),
      title: faker.random.words(),
      comfort: faker.random.number(stars), // 0 - 5
      style: faker.random.number(stars), // 0-5
      value: faker.random.number(stars), // 0-5
      sizing: faker.random.number(sizing), // [too small, too big, true to size]
      helpfulVotes: faker.random.number(stars), // number of "helpful" votes
    }
    if (counter < 20) {
      fakeReview.productId = productIds[0]
    } else {
      counter = 0;
      fakeReview.productId = productIds.shift();
    }

    data.push(fakeReview);
  }
  return data;
};

const fakeReviews = generateReviews(2000);

//remove any previously stored data
Reviews.deleteMany({})
.then(() => {
  console.log('DB Empty')
})
.then(() => {
  Reviews.create(fakeReviews)
    .then(() => {
      console.log('DB SEEDED');
    })
    .then(() => {
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error('ERROR with seeding database');
    })
})
.catch((err) => {
  console.error('ERROR with removing data');
})

