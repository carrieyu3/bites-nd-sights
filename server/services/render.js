const axios = require('axios');
const path = require('path');

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

// C:\Users\micha\Documents\GitHub\Web-Development-Final-Project\src\login.html
// C:\Users\micha\Documents\GitHub\Web-Development-Final-Project\server\services\src\login.html