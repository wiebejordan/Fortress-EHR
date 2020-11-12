const express = require('express'),
      authCtrl = require('./authController'),
      app = express();



app.use(express.json())

app.listen(5150, () => console.log('server is running on 5150'))