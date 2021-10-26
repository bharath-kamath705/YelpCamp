const express = require('express')
const router = express.Router({mergeParams: true})
const Review = require('../models/Reviews')
const Campground = require('../models/Campgrounds')
const catchAsync = require('../Utils/catchAsync')
const validations = require('../SchemaValidations')
const ExpressError = require('../Utils/ExpressError')

const validateReview = async (req, res, next) => {
    const {error} = await validations.reviewSchema.validate(req.body.review);
    if(error){
        let errMsg = error.details.map(itm => itm.message).join(',')
        throw new ExpressError(errMsg, 400)
    }
    next()
}

router.post('/', catchAsync(validateReview), catchAsync(async (req, res, next) =>{
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success', 'Successfully added review')
    res.redirect('/campgrounds/' + campgroundId)
}))

router.delete('/:reviewId', catchAsync(async (req, res, next) =>{
    const campgroundId = req.params.campgroundId
    const reviewId = req.params.reviewId
    await Campground.findByIdAndUpdate(campgroundId, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted a review')
    res.redirect(`/campgrounds/${campgroundId}`)
}))

module.exports = router