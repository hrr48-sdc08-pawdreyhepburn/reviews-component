const client = require('../index.js');

module.exports = {
  getAll: (productId, callback) => {
    var selectQuery = `
    SELECT * FROM reviews WHERE productId = ${productId}
    `
    client.query(selectQuery)
    .then((results)=>{
      callback(results)
    })
    .catch(err => {
      console.error(err)
    })
  },

  addReview: (productid, review, callback) => {
    var insertQuery = `INSERT INTO reviews (reviewId, username, productId, title, body, createdAt, wouldRecommend, overall, comfort, style, value, sizing, helpfulVotes) VALUES (nextval('reviews_sequence'),'${review.username}', ${productid}, '${review.title}', '${review.body}', '${review.createdAt}', ${review.wouldRecommend}, ${review.overall}, ${review.comfort}, ${review.style}, ${review.value}, ${review.sizing}, 0)
    `
    client.query(insertQuery)
    .then((result) => {
      console.log('result from query', result)
      callback()
    })
    .catch(err => {
      console.error(err)
    })
  }
}