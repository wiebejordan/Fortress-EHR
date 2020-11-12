require ('dotenv').config();

const express = require('express'),
      app = express(),
      massive = require('massive'),
      {SERVER_PORT, SESSION_SECRET, DB_URI} = process.env,
      authCtrl = require('./authController');



app.use(express.json())

app.listen(SERVER_PORT, () => console.log(`server is running on ${SERVER_PORT}`));