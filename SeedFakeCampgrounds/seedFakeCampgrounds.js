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
    const campground = CreateRandomCampground()
    await campground.save()
}

function CreateRandomCampground() {
    const randomCity = getRandomItemFromArray(cities)
    const price = Math.floor((Math.random() * 10) + 10)
    const campground = new Campground({
        title: getRandomCampgroundName(),
        location: `${randomCity.city}, ${randomCity.state}`,
        image: "https://source.unsplash.com/300x300/?hiking+trail",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: price
    })
    return campground
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
