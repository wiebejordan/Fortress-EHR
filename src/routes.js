import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PatientList from './Components/PatientList/PatientList';
import Patient from './Components/Patient/Patient';
import Login from './Components/Login/Login';
import NewPatient from './Components/NewPatient/NewPatient';
import NewUser from './Components/NewUser/NewUser';


export default (
  <Switch>
    <Route exact path='/' component={Login}/>
    <Route path ='/main' component={PatientList}/>
    <Route path='/patient/:patientid' component={Patient}/>
    <Route path='/newpatient' component={NewPatient}/>
    <Route path='/newuser' component={NewUser}/>
  </Switch>
);