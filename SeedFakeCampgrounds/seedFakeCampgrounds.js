// Clears DB and adds seed data for testing
    // Navigate to this directory and run seedFakeCampgrounds.js with node

const yelpDBServer = require('../yelpCampDBServer')
const cities = require('./cities.js')
const randomCampNameData = require('./randomCampNameData.js')
const Campground = require('../models/Campgrounds')
const  mongoose  = require('mongoose')

yelpDBServer.startServer()

function getRandomItemFromArray(array){
    return array[Math.floor(Math.random() * (array.length))]
}

function getRandomCampgroundName(){
    const descriptor = getRandomItemFromArray(randomCampNameData.descriptors)
    const place = getRandomItemFromArray(randomCampNameData.places)
    return `${descriptor} ${place}`
}

async function SaveRandomCampground() {
    const randomCity = getRandomItemFromArray(cities)
    const campground = new Campground({
        title: getRandomCampgroundName(),
        location: `${randomCity.city}, ${randomCity.state}`
    })
    await campground.save()
}

const seedData = async function(){
    await Campground.deleteMany({})
    console.log("Cleared existing data")

    for(let i = 0; i < 50; i++){
        await SaveRandomCampground()
    }

    console.log("Seeded new data")
}

seedData().then(()=> mongoose.connection.close())


