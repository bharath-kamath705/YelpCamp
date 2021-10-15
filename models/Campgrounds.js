const mongoose = require('mongoose');
const Review = require('../models/Reviews')

const campgroundSchema = new mongoose.Schema({
    title: String,
    price: {type: Number, default: 0},
    description: String,
    location: String,
    image: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

campgroundSchema.post('findOneAndDelete', async function(doc){
    console.log("Removed review refs from campground")
    await Review.remove({
        _id: {$in: doc.reviews}
    })
})

const Campground = mongoose.model('campground', campgroundSchema);

module.exports = Campground;