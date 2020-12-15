import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const PatientOverview = (props) => {
  const [item, setItem] = useState({}),
        lang = useSelector(state => state.languageReducer.english),
        {patient, encounters} = props
        console.log(encounters)
 
  
  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>
        <h1>
        patient overview
          </h1>
        <p>Birthdate: {patient.birthdts}</p>
        <p>Gender: {patient.genderdsc}</p>
        <p>Latest Encounter Date: {encounters[encounters.length-1].encounterdts}</p>
        <p>Recent Notes: {encounters[encounters.length-1].commenttxt}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
        <p>Fecha de Nacimiento{patient.birthdts}</p>
      </div>
      }
      </div>
    )
  }


export default PatientOverview;