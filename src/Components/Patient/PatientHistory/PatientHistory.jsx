import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const PatientHistory = (props) => {
  const [item, setItem] = useState('overview'),
        lang = useSelector(state => state.languageReducer.english)

  

  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>
        <h3>Patient History</h3>
        <p>{props.patient.history}</p>
        
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
        <h3>Historial de Paciente</h3>
        <p>{props.patient.history}</p>
      </div>
      }
      </div>
    )
  }


export default PatientHistory;