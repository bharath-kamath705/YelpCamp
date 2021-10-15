const yelpServer = require('./yelpCampServer')
const yelpDBServer = require('./yelpCampDBServer')
const Campground = require('./models/Campgrounds')
const Review = require('./models/Reviews')
const catchAsync = require('./Utils/catchAsync')
const ExpressError = require('./Utils/ExpressError')
const Joi = require('Joi')
const validations = require('./SchemaValidations')

const app = yelpServer.app

yelpServer.startServer()
yelpDBServer.startServer()

const validateCampground = async (req, res, next) => {
    const {error} = await validations.campgroundSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(itm => itm.message).join(',')
        throw new ExpressError(errMsg, 400)
    }
    next()
}

const validateReview = async (req, res, next) => {
    const {error} = await validations.reviewSchema.validate(req.body.review);
    if(error){
        let errMsg = error.details.map(itm => itm.message).join(',')
        throw new ExpressError(errMsg, 400)
    }
    next()
}

app.get('/', (req, res) => {
    res.render('./home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/campgrounds', {campgrounds})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('./campgrounds/new')
})

app.post('/campgrounds', catchAsync(validateCampground), catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:campgroundId', async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId).populate('reviews')
    res.render('./campgrounds/show', {campground})
})

app.get('/campgrounds/:campgroundId/edit', async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId)
    res.render('./campgrounds/edit', {campground})
})

app.put('/campgrounds/:campgroundId', catchAsync(async (req, res, next) => {
    var campgroundId = req.params.campgroundId
    const campground = await Campground.findByIdAndUpdate(campgroundId, req.body)
    res.redirect(`/campgrounds/${campgroundId}`)
}))

app.delete('/campgrounds/:campgroundId', async (req, res) => {
    const campgroundId = req.params.campgroundId
    await Campground.findByIdAndDelete(campgroundId)
    console.log("Removed campground")
    res.redirect('/campgrounds')
})

app.post('/campgrounds/:campgroundId/reviews', catchAsync(validateReview), catchAsync(async (req, res, next) =>{
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    res.redirect('/campgrounds/' + campgroundId)
}))

app.delete('/campgrounds/:campgroundId/reviews/:reviewId', catchAsync(async (req, res, next) =>{
    const campgroundId = req.params.campgroundId
    const reviewId = req.params.reviewId
    await Campground.findByIdAndUpdate(campgroundId, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${campgroundId}`)
}))

app.all('*', (req, res, next) => {
    throw new ExpressError("Not found!", 404);
})

app.use((err, req, res, next) => {
    const {message="Something went wrong!", status=500} = err
    res.status = status
    res.render('./errorTemplate', {message, status})
})