// /server/midl/fetchJobs
var jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');

const fetchUser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('auth_token');
    if (!token) {
        return res.status(401).send({ error: "Please Authenticate using a Valid Token" });
    }

    try {
        console.log('Token received:', token);
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        req.userType = data.user.type;
        next(); // Proceed to the next middleware or route handler if token is valid
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).send({ error: "Please Authenticate using a Valid Token" });
    }
};


module.exports = fetchUser;