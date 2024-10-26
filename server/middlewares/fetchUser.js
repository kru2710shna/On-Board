// /server/midl/fetchJobs
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
        console.log('Token received:', token);
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        next();
    }
    catch (err) {
        console.log(err)
        console.error('Token verification error:', err);
        return res.status(401).send({ error: "Please Authenticate using a Valid Token" });
    }
}
module.exports = fetchUser;