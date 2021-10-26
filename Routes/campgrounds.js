const express = require('express')
const router = express.Router()
const Campground = require('../models/Campgrounds')
const catchAsync = require('../Utils/catchAsync')
const validations = require('../SchemaValidations')
const ExpressError = require('../Utils/ExpressError')

const validateCampground = async (req, res, next) => {
    const {error} = await validations.campgroundSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(itm => itm.message).join(',')
        throw new ExpressError(errMsg, 400)
    }
    next()
}

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('../views/campgrounds/campgrounds', {campgrounds})
})

router.get('/new', (req, res) => {
    res.render('./campgrounds/new')
})

router.post('/', catchAsync(validateCampground), catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body)
    await campground.save()
    req.flash('success', 'Successfully created a new campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:campgroundId', catchAsync(async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId).populate('reviews')
    if(!campground){
        req.flash('failure', 'Could not find campground')
        return res.redirect('/campgrounds')
    }
    res.render('./campgrounds/show', {campground})
}))

router.get('/:campgroundId/edit', async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId)
    res.render('./campgrounds/edit', {campground})
})

router.put('/:campgroundId', catchAsync(validateCampground), catchAsync(async (req, res, next) => {
    var campgroundId = req.params.campgroundId
    const campground = await Campground.findByIdAndUpdate(campgroundId, req.body)
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campgroundId}`)
}))

router.delete('/:campgroundId', async (req, res) => {
    const campgroundId = req.params.campgroundId
    await Campground.findByIdAndDelete(campgroundId)
    console.log("Removed campground")
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
})

module.exports = router
