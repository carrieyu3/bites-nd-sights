const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
var Userdb = require('../model/model');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { getAllPosts } = require('../controller/controller');



exports.index = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'views', 'index.html');
    console.log(`Serving file from: ${filePath}`);

    res.sendFile(filePath);

}

exports.login = (req, res) => {
    const filePath = path.join(__dirname, '..', '..','views', 'login.html');
    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}

exports.signup = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'views', 'signup.html');
    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}


exports.explore = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.render('explorepage', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
};

//login@example.com