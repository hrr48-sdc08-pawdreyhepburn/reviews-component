const mongoose = require('mongoose');
const db = require('./db.js');

mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
    author: String,
    stars: Number, // 0 through 5
    body: String,
    createdAt: String, // date
    wouldRecommend: Boolean,
    title: String,
    comfort: Number, // 0 - 5
    style: Number, // 0-5
    value: Number, // 0-5
    sizing: Number, // [too small, too big, true to size]
    helpfulVotes: Number, // number of "helpful" votes
    productId: Number
});

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;