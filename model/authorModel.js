const mongoose = require("mongoose")

const authorModel = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please Enter your Name"]
    },
    About: {
        type: String,
        required: [true, "Short Description"]
    },
    CreatedAt: {
        type: Date, 
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    }
})




module.exports = mongoose.model("Authors", authorModel)