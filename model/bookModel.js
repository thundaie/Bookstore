const mongoose = require("mongoose")

const books = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    Author: {
        type: String,
        required: true,
    },
    ISBN: {
        type: Number,
        required: true
    },
    Published: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    }
})



// const Book = mongoose.model("books", books)


module.exports = mongoose.model("books", books)

// module.exports = {
//     Book
// }