const { auth } = require("express-openid-connect")
require("dotenv").config()

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseUrl: process.env.BASEURL,
    clientId: process.env.CLIENTID,
    issuerBaseUrl: process.env.ISSUERBASE
}


module.exports = auth(config)


