const axios = require('axios');

exports.index = (req, res) => {
    const filePath = path.join(__dirname, 'src', 'login.html');
    console.log(`Serving file from: ${filePath}`);


    res.sendFile(path.join(__dirname, 'src', 'index.html'));
}

exports.login = (req, res) => {

    res.sendFile(path.join(__dirname, 'src', 'login.html'));
}

exports.signup = (req, res) => {

    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
}