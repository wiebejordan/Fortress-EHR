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
      <div>patient HISTORY
        <p>{props.patient.firstnm}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Historial Del Paciente
        <p>{props.patient.firstnm}</p>
      </div>
      }
      </div>
    )
  }


export default PatientHistory;