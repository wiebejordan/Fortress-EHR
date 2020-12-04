import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PatientList from './Components/PatientList/PatientList';
import PatientMain from './Components/Patient/PatientMain/PatientMain';
import Login from './Components/Login/Login';
import NewPatient from './Components/NewPatient/NewPatient';
import NewUser from './Components/NewUser/NewUser';
import NoMatchPage from './Components/NoMatchPage/NoMatchPage';


export default (
  <Switch>
    <Route exact path='/' component={Login}/>
    <Route path ='/main' component={PatientList}/>
    <Route path='/patient/:patientid' component={PatientMain}/>
    <Route path='/newpatient' component={NewPatient}/>
    <Route path='/newuser' component={NewUser}/>
    <Route component={NoMatchPage}/>
  </Switch>
);