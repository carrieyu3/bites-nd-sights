const express = require('express');
const path = require('path');
const axios = require('axios');

exports.index = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'src', 'index.html');
    console.log(`Serving file from: ${filePath}`);

    res.sendFile(filePath);

}

exports.login = (req, res) => {
    const filePath = path.join(__dirname, '..', '..','src', 'login.html');
    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}

exports.signup = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'src', 'signup.html');
    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}

exports.explore = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'src', 'explorePage.html');

    

    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}