require ('dotenv').config();

const express = require('express'),
      app = express(),
      massive = require('massive'),
      {SERVER_PORT, SESSION_SECRET, DB_URI} = process.env,
      authCtrl = require('./authController');



app.use(express.json())

massive({
  connectionString: DB_URI,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('db connected')
}).catch(err => console.log(err));



app.listen(SERVER_PORT, () => console.log(`server is running on ${SERVER_PORT}`));