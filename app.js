const yelpServer = require('./yelpCampServer')
const yelpDBServer = require('./yelpCampDBServer')
const Campground = require('./models/Campgrounds')

const app = yelpServer.app

yelpServer.startServer()
yelpDBServer.startServer()

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

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:campgroundId', async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId)
    res.render('./campgrounds/show', {campground})
})

app.get('/campgrounds/:campgroundId/edit', async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findById(campgroundId)
    res.render('./campgrounds/edit', {campground})
})

app.put('/campgrounds/:campgroundId', async (req, res) => {
    const campgroundId = req.params.campgroundId
    const campground = await Campground.findByIdAndUpdate(campgroundId, req.body)
    res.redirect(`/campgrounds/${campgroundId}`)
})

app.delete('/campgrounds/:campgroundId', async (req, res) => {
    const campgroundId = req.params.campgroundId
    await Campground.findByIdAndDelete(campgroundId)
    res.redirect('/campgrounds')
})