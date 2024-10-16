///server/middleware/fetchUser

var jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');

const fetchUser =(req,res, next) => {

    //get the user from the jwd toekn  and add it to project
    const token = req.header('auth_token')
    if (!token){
        res.status(401).send({error : "Please Authenticate using Valid Toekn"})
    }
    try { 
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        next();

    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
module.exports = fetchUser;