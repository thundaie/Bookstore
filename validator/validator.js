const joi = require("joi")

const bookSchema = joi.object({
    name: joi.string()
        .required()
        .trim()
        .min(5)
        .max(100),
    Author: joi.string()
        .required()
        .min(5)
        .max(100)
        .trim(),
    ISBN: joi.number()
        .integer()
        .min(10)
        //.max(20)
        .required(),
    Published: joi.number()
        .max(2023)
        .required(),
    CreatedAt: joi.date()
        .default(Date.now),
    lastUpdtedAt: joi.date()
        .default(Date.now)        
})


const updateSchema = joi.object({
    name: joi.string()
        .trim()
        .min(5)
        .max(100),
    Author: joi.string()
        .min(5)
        .max(100)
        .trim(),
    ISBN: joi.number()
        .integer()
        .min(10)
        //.max(20)
        ,
    Published: joi.number()
        .max(2023),
    /*CreatedAt: joi.date()
        .default(Date.now),
        */
    lastUpdtedAt: joi.date()
        .default(Date.now)        
})

const authorDeets = joi.object({
    Name: joi.string()
        .trim()
        .min(2)
        .max(59)
        .required(),
    About: joi.string()
        .trim()
        .min(20)
        .required(),
    CreatedAt: joi.date()
        .default(Date.now),
    lastUpdtedAt: joi.date()
        .default(Date.now)        
})



const authorUpdate = joi.object({
    Name: joi.string()
        .trim()
        .min(2)
        .max(59),
    About: joi.string()
        .trim()
        .min(20),
        lastUpdtedAt: joi.date()
        .default(Date.now)        
})



const bookValidationMiddleware = async (req, res, next) => {
    const bookPayload = req.body

    try {
        await bookSchema.validateAsync(bookPayload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }

}


const updateBookMw = async (req, res, next) => {
    const updatePayload = req.body

    try {
        await updateSchema.validateAsync(updatePayload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}


const AuthorValidator = async(req, res, next) => {
    const authorPayload = req.body

    try {
        await authorDeets.validateAsync(authorPayload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }

}

const AuthorUpdate = async(req, res, next) => {
    const payload = req.body

    try {
        await authorUpdate.validateAsync(payload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = { 
    bookValidationMiddleware, 
    updateBookMw,
    AuthorValidator,
    AuthorUpdate
}