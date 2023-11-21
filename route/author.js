const express = require("express")
const authorRoute = express.Router()
const author = require("../model/authorModel")
const { AuthorValidator, AuthorUpdate } = require("../validator/validator")


authorRoute.get("/", (req, res) => {
    res.send("Please Sign up/Sign in")
})

authorRoute.post("/", AuthorValidator, async(req, res) => {
    const deets = req.body
    deets.CreatedAt = new Date()
    deets.UpdatedAt = new Date()

    const newAuthor = new author(deets)

    try {
        await newAuthor.save()
        res.send("Author Details Added successfully")
    } catch (error) {
    res.send({
        message: "An error occured while trying to save Author details"
    })        
    }

})


authorRoute.put("/:id", AuthorUpdate, async(req, res) => {
    const deets = req.body
    const _id = req.params.id
    deets.UpdatedAt = new Date()


    try {
        await author.findByIdAndUpdate(_id, deets, { new: true })
        res.send("Author Details Added successfully")
    } catch (error) {
    res.send({
        message: "An error occured while trying to save Author details"
    })        
    }

})

module.exports = authorRoute