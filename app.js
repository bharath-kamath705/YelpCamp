const yelpServer = require('./yelpCampServer')
const yelpDBServer = require('./yelpCampDBServer')
const Campground = require('./models/Campgrounds')

const app = yelpServer.app

yelpServer.startServer()
yelpDBServer.startServer()

app.get('/', (req, res) => {
    res.render('./home')
})

app.get('/campgrounds/index', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index', {campgrounds})
})
