import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './Components/Main/Main';
import Patient from './Components/Patient/Patient';
import Login from './Components/Login/Login';

export default (
  <Switch>
    <Route exact path='/' component={Main}/>
    <Route path='/patient/:patientid' component={Patient}/>
  </Switch>
);