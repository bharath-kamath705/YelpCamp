const mongoose = require('mongoose');
const Schema = mongoose.Schema

const campgroundSchema = new Schema({
    title: String,
    price: {type: Number, default: 0},
    description: String,
    location: String,
    image: String
})

const Campground = mongoose.model('campground', campgroundSchema);

module.exports = Campground;