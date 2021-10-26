const yelpServer = require('./yelpCampServer')
const yelpDBServer = require('./yelpCampDBServer')
const ExpressError = require('./Utils/ExpressError')
const campgroundsRoutes = require('./Routes/campgrounds')
const reviewsroutes = require('./Routes/reviews')

const app = yelpServer.app

yelpServer.startServer()
yelpDBServer.startServer()

app.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashFailure = req.flash('failure')
    next()
})

app.use('/campgrounds', campgroundsRoutes)
app.use('/campgrounds/:campgroundId/reviews', reviewsroutes)

app.get('/', (req, res) => {
    res.render('./home')
})

app.all('*', (req, res, next) => {
    throw new ExpressError("Not found!", 404);
})

app.use((err, req, res, next) => {
    const {message="Something went wrong!", status=500} = err
    res.status = status
    res.render('./errorTemplate', {message, status})
})