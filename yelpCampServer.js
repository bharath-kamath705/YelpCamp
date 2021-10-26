const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')

const daysToMilliseconds = function(days){
    return days * 24 * 60 * 60 * 1000
}

const startServer = function (){
    portNum = 3000

    app.engine('ejs', ejsMate)
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    app.use(session({
        secret: "placeholderxyzzyspoon!",
        resave: false,
        saveUninitialized: true,
        cookie:{
            httpOnly: true,
            expires: Date.now() + daysToMilliseconds(7),
            maxAge: daysToMilliseconds(7)
        }
    }))
    app.use(flash())
    app.use(express.urlencoded({extended: true}))
    app.use(methodOverride('_method'))
    app.use(express.static(path.join(__dirname, 'Public')))

    app.get('/ping', (req, res) => {
        res.send("pong")
    })

    app.listen(portNum, ()=>{
        console.log(`YelpCamp server listening on port ${portNum}`)
    })
}

exports.startServer = startServer;
exports.app = app;
exports.express = express;
