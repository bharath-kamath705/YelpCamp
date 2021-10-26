const mongoose = require('mongoose')

const startServer = function(){

    const port = 27017; // 27017 default port for mongo
    const dbName = "yelp-camp";
    mongoose.connect(`mongodb://localhost:${port}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
    .then((dat) => {
        console.log(`Connected to db ${dbName} on port ${port}`);
    })
    .catch((err)=>{
        console.log("Failed to connect to mongoDB");
    })
}

exports.startServer = startServer