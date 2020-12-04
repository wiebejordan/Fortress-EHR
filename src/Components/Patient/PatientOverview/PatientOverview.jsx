import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const PatientOverview = (props) => {
  const [item, setItem] = useState({}),
        lang = useSelector(state => state.languageReducer.english);

 
  
  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>
        <h1>
        patient overview
          </h1>
        <p>{props.patient.firstnm}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Vision De Paciente
        <p>{props.patient.firstnm}</p>
      </div>
      }
      </div>
    )
  }


export default PatientOverview;