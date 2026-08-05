const blacklistModel = require("../models/blacklist.model");
const { getMe } = require("../controllers/auth.controller");
const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

// const isTokenBlacklisted = await blacklistModel.findOne({
//   token
// })//new comment 4/8/26


async function authUser(req , res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
     
        })
    }

    const isTokenBlacklisted = await blacklistModel.findOne({
        token
         })

         if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Invalid Token" 
        })
     }

        try{
   const decoded =  jwt.verify(
        token,
        process.env.JWT_SECRET,
    )

    req.user = decoded

        next()
} catch (err) {
    return res.status(401).json({
        message: "Invalid Token"
       })
    }
}

module.exports = {
    authUser
}