const mongoose = require("mongoose")
require("dotenv").config()
const logger = require("../logging/logger")

const CONNECTION_URI = process.env.CONNECTION_URI

function connectDb(){
    mongoose.connect(CONNECTION_URI)

        mongoose.connection.on("connected", () => {
            logger.info("connection to database established")
        })

        mongoose.connection.on("error", (err) => {
           logger.error(err)
        })
}


module.exports = connectDb