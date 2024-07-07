const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');

dotenv.config({path:'config.env'});

const port = process.env.PORT || 8000; 

const app = express();

const connectDB = require('./server/database/connection');

// Mongodb connection
// connectDB();

// Parser request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// set view engine
app.set("view engine", "ejs");

// app.use("/src", express.static(path.resolve(__dirname, "src")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
