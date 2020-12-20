const { getEncounters } = require('./encounterController');

require ('dotenv').config();

const express = require('express'),
      app = express(),
      session = require('express-session'),
      massive = require('massive'),
      {SERVER_PORT, SESSION_SECRET, DB_URI} = process.env,
      patientCtrl = require('./patientController'),
      encounterCtrl = require('./encounterController'),
      immuneCtrl = require('./immuneController'),
      allergyCtrl = require('./allergyController'),
      authCtrl = require('./authController');



app.use(express.json())

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));

massive({
  connectionString: DB_URI,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('db connected')
}).catch(err => console.log(err));

//login endpoints
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.post('/auth/newuser', authCtrl.newUser);
app.post('/auth/newuseradmin', authCtrl.newUser)

//session endpoints
app.get('/auth/user', authCtrl.keepUser);

//patient endpoints
app.get('/api/patients', patientCtrl.getPatients);
app.get('/api/patient/:patientid', patientCtrl.getPatient);
app.post('/api/newpatient', patientCtrl.newPatient);
app.put('/api/edithistory/:patientid', patientCtrl.editHistory);

//encounter endpoints
app.get('/api/encounters/:patientid', encounterCtrl.getEncounters);
app.post('/api/newencounter', encounterCtrl.newEncounter)

//immunization endpoints
app.get('/api/immunes/:patientid', immuneCtrl.getImmunes);
app.post('/api/newimmune', immuneCtrl.newImmune);

//allergy endpoints
app.get('/api/allergies/:patientid', allergyCtrl.getAllergies);
app.post('/api/newallergy', allergyCtrl.newAllergy)

app.listen(SERVER_PORT, () => console.log(`server is running on ${SERVER_PORT}`));