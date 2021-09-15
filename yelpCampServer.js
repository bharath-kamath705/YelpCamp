const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const app = express()

const startServer = function (){
    portNum = 3000

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    app.use(express.urlencoded({extended: true}))
    app.use(methodOverride('_method'))

    app.get('/ping', (req, res) => {
        res.send("pong")
    })

    app.listen(portNum, ()=>{
        console.log(`YelpCamp server listening on port ${portNum}`)
    })
}

exports.startServer = startServer;
exports.app = app;
