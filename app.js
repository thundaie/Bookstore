const express = require('express')
const app = express()
require("dotenv").config()
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const connectDb = require("./connect/connect")
const BookRouter = require("./route/bookRoute")
const authorRoute = require("./route/author")
const logger = require("./logging/logger")
const authMw = require("./auth/auth")

const limiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})


//connect to Database
connectDb()

//MiddlewareFunctions
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/bookroute", BookRouter)
app.use("/authorRoute", authorRoute)
app.use(limiter) 
app.use(helmet()) //SecurityMiddleware
app.use(authMw) //Authentication

const PORT = process.env.PORT



app.get("/", (req, res) => {
    res.send("Welcome to my Bookstore API")
})



//err0r handler
app.use((err, req, res, next) => {
    logger.error(err)
    
    const errStatus = err.status || 500

    res.status(errStatus).send("An error occured")

    next()

})

app.listen(PORT, () => {
    logger.info(`You are listening on ${PORT}`)
})