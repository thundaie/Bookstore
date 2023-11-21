    const express = require("express")
const bookRouter = express.Router()
const books = require("../model/bookModel")
const { bookValidationMiddleware, updateBookMw } = require("../validator/validator")

//All books
bookRouter.get("/", async(req, res) => {
    const allBooks = await books.find()

    try {
        res.send(allBooks)
    } catch (error) {
        console.log(error)
        res.status(500).send("An internal Server Error occured")
    }
})


//Find by ID
bookRouter.get("/:id", async(req, res) => {
    const serial = req.params.id

    const oneBook = await books.findById(serial)

    try {
        res.send(oneBook)
    } catch (error) {
        console.log(error)
        res.status(500).send("An internal Server Error occured")
    }
})


//Add Books
bookRouter.post("/", bookValidationMiddleware, async(req, res) => {
    const addBook = req.body
    addBook.lastUpdtedAt = new Date()
    addBook.CreatedAt = new Date()

    const newBook = new books(addBook)
    try {
        await newBook.save(addBook)
        res.send("The book has been added successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occured while attempting to save your book")
    }
})

//Update Book
bookRouter.put("/:id", updateBookMw, async(req, res) => {
    const bookToUpdate = req.body
    bookToUpdate.lastUpdtedAt = new Date()
    const _id = req.params.id

    try {
        await books.findByIdAndUpdate(_id, bookToUpdate, { new: true })
        res.send("Your update was successful")
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occured while attempting to update your book")
    }
})

//Delete
bookRouter.delete("/:id", async(req, res) => {
    const id = req.params.id

    try {
        await books.findOneAndDelete(id)
        res.send("The book has been deleted successfully")

    } catch (error) {
        console.log(error)
        res.status(500).send("Unable to delete book, Try again Later")
    }
})


module.exports = bookRouter