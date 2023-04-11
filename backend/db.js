const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB