const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const db_connection = require('./config');
const userRoute = require('./routes/signIn_signup.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/user', userRoute);

//resolved the bug from stack-overflow 
// https://stackoverflow.com/questions/79553495/throw-new-typeerrormissing-parameter-name-at-i-debug-url
app.all('/{*any}', (req, res, next) => {
  res.status(404).send("404 Error: Page not found.");
})

db_connection.sync()
  .then(() => {
    console.log("Database synced.");
    app.listen(port, hostname, () => {
      console.log(`Running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
