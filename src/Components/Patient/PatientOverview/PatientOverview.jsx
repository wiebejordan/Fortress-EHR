import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';


const PatientOverview = (props) => {
  const [item, setItem] = useState({}),
        lang = useSelector(state => state.languageReducer.english),
        {patient, encounters, allergies} = props
        // console.log(encounters)
 
  
  

    return (
      <div style={{height: '400px', width: '100%', overflow:'auto'}}>
      
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
        <h3>Allergies</h3>
        <button>Add/Edit</button>
        <>
        {allergies.map((allergy) => 
          <div key={allergy.allergyid}>
            <p>{allergy.createdts}</p>
            <p>{allergy.typedsc}</p>
            <p>{allergy.allergydsc}</p>
            <p>{allergy.severitydsc}</p>
            <p>{allergy.reactiondsc}</p>
          </div>
        )}

        {allergies.length === 0 
        ? <p>This patient does not have any allergies on record.</p>
        : null}
        </>
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