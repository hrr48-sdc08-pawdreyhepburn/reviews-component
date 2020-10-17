const faker = require('faker');
const fs = require('fs');
const { performance } = require('perf_hooks');


function createReviews(numOfReviews) {
  var totalReviews = numOfReviews;
  var start = performance.now();
  const writeReviews = fs.createWriteStream('../data/reviews.csv');
  writeReviews.write('userId,productId,title,body,wouldRecommend,overall,comfort,style,value,sizing,helpfulVotes\n', 'utf8');

  const users = {min: 0, max: 500000};
  const products = {min: 0, max: 10000000};
  const stars = {min: 1, max: 5}
  const helpful = {min: 0, max: 20};

  function createReview() {
    let ok = true;
    do {
      numOfReviews -= 1;
      const userId = faker.random.number(users);
      const productId = faker.random.number(products);
      const title =  faker.lorem.words(3);
      const body = faker.lorem.paragraph();
      const wouldRecommend = faker.random.boolean();
      const overall = faker.random.number(stars);
      const comfort = faker.random.number(stars);
      const style = faker.random.number(stars);
      const value = faker.random.number(stars);
      const sizing = faker.random.number(stars);
      const helpfulVotes = faker.random.number(helpful);

      const review = `${userId},${productId},${title},${body},${wouldRecommend},${overall},${comfort},${style},${value},${sizing},${helpfulVotes}\n`
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

function createUsers(numOfUsers) {
  var totalUsers = numOfUsers;
  var start = performance.now();
  const writeUsers = fs.createWriteStream('../data/users.csv');
  writeUsers.write('userId,username\n', 'utf8');

  var id = 0;

  function createUser() {
    let ok = true;
    do {
      numOfUsers -= 1;
      const userId = id;
      const username = faker.internet.userName();

      id++;

      const user = `${userId},${username}\n`
      if (numOfUsers === 0) {
        writeUsers.write(user, 'utf8', () => {
          writeUsers.end();
          var end = performance.now()
          var time = end - start;
          console.log(`It took ${time/1000} seconds to generate ${totalUsers/1000000}M users.`)
        });
      } else {
        ok = writeUsers.write(user, 'utf8');
      }
    } while(numOfUsers > 0 && ok);
    if (numOfUsers > 0 ) {
      writeUsers.once('drain', createUser)
    }
  }
  createUser()
}

createUsers(500000);

// // create a 10M products
// var createProducts = (numOfProd) => {
//   var products = [];
//   for (var i = 0; i < numOfProd; i++) {
//     var product = {};
//     product.productName = faker.lorem.word()
//     product.id = i;
//     products.push(product)
//   }
//   return products;
// }
// // create 500,000 users
// var createUsers = (numOfUsers) => {
//   var users = [];
//   for (var i = 0; i < numOfUsers; i++) {
//     var user = {};
//     user.userName = faker.name.firstName();
//     user.id = numOfUsers[i];
//     users.push(user)
//   }
//   return users;
// }
// var start = new Date().getTime();
// var allProducts = createProducts(100000);
// var allUsers = createUsers(50000);

// // create 0-20 reviews per product
// var createReviews = function() {
//   var reviews = [];
//   var stars = {
//     'min': 1,
//     'max': 5
//   };
//   var sizing = {
//     'min': 1,
//     'max': 3
//   };

//   //helper function to generate random date during a 3 month time period
//   function randomDate(start, end) {
//     var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-');
//   }

//   // generates a random amount of reviews per product
//   for (var i = 0; i < allProducts.length; i++){
//     var reviewsPerProd = faker.random.number({
//       min: 0,
//       max: 20
//     })

//     for (var j = 0; j < reviewsPerProd; j++) {
//       var review = {
//         user: faker.random.number({
//           min: 0,
//           max: allUsers.length
//         }),
//         productId: allProducts[i].id,
//         overall: faker.random.number(stars),
//         title: faker.lorem.word(3),
//         body: faker.lorem.paragraph(),
//         createdAt: randomDate(new Date("2020-07-01T20:44:19.172Z"), new Date("2020-10-01T20:44:19.172Z")),
//         wouldRecommend: faker.random.boolean(),
//         comfort: faker.random.number(stars),
//         style: faker.random.number(stars),
//         value: faker.random.number(stars),
//         sizing: faker.random.number(sizing),
//         helpfulVotes: faker.random.number(stars),
//       }

//       reviews.push(review)
//     }
//   }
//   // console.log(reviews, reviews.length)
//   return reviews;
// }

// var allReviews = createReviews()
// var end = new Date().getTime();
// var time = end - start;
// console.log(`It took ${time} milliseconds to generate ${allReviews.length} reviews, ${allProducts.length} products, and ${allUsers.length} users. That is approximately ${Math.round(allReviews.length/allProducts.length)} reviews per product.`)