const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

dotenv.config({path:'config.env'});

const port = process.env.PORT || 8000; 

const app = express();

const connectDB = require('./server/database/connection');

// Mongodb connection
connectDB();

// Log request
app.use(morgan('tiny'));

// Parser request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use('/', require('./server/routes/routes'));

app.use(express.static(path.join(__dirname, 'src')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



// // Default route
// app.get('/', (req, res) => {
//   const filePath = path.join(__dirname, 'src', 'login.html');
//   console.log(`Serving file from: ${filePath}`);
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(404).send('File not found');
//     }
//   });
// });

// // Additional route for index.html
// app.get('/index', (req, res) => {
//   const filePath = path.join(__dirname, 'src', 'index.html');
//   console.log(`Serving file from: ${filePath}`);
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(404).send('File not found');
//     }
//   });
// });
