const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: String,
    rating: {type: Number, default: 0},
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;