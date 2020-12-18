import React, { useEffect, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import axios from 'axios';


const PatientOverview = (props) => {
  const [item, setItem] = useState({}),
        [allergyEdit, setAllergyEdit] = useState(false),
        [newAllergy, setNewAllergy] = useState({typedsc: '', createdts: '', allergydsc: '', severitydsc: '', reactiondsc: ''}),
        lang = useSelector(state => state.languageReducer.english),
        {patient, encounters, allergies} = props
        console.log(newAllergy)

    
 
    const handleToggle = () => {
      setAllergyEdit(!allergyEdit)
    }

    const handleInput = (e, result) => {
      const {name, value} = result || e.target;
      setNewAllergy({...newAllergy, [name]: value});
    };

    const submitAllergy = () => {
      const { typedsc, createdts, allergydsc, severitydsc, reactiondsc} = newAllergy;

      axios.post(`/api/newallergy`, {patientid: patient.patientid, createdts, typedsc, allergydsc, severitydsc, reactiondsc})

      .then(() => {
        if(lang === true){
          alert('new allergy added!')
  
        }
        else{
          alert('Nueva alergia agregada!')
        }
        window.location.reload(true)
      })
      .catch(err => console.log(err));
    }



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
        {allergyEdit
        ?
        <div>
        <p>Allergy Type:</p>
        <p>Today's Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='createdts' 
          />
        <input name='typedsc' placeholder='food, animal, medicine, etc' onChange={(e) => handleInput(e)}/>
        <p>Allergy:</p>
        <input name='allergydsc' placeholder='Bees, peanuts, etc.' onChange={(e) => handleInput(e)}/>
        <p>Severity:</p>
        <input type='radio' value='mild' name='severitydsc' onChange={(e) => handleInput(e)}/>
        <label>Mild</label><br/>
        <input type='radio' value='moderate' name='severitydsc' onChange={(e) => handleInput(e)}/>
        <label>Moderate</label><br/>
        <input type='radio' value='Severe' name='severitydsc' onChange={(e) => handleInput(e)}/>
        <label>Severe</label><br/>
        <p>Reactions:</p>
        <input name='reactiondsc' placeholder='hives, vomiting, etc.' onChange={(e) => handleInput(e)}/>
        <button onClick={handleToggle}>Cancel</button>
        <button onClick={submitAllergy}>Submit Allergy</button>
        </div>
        :
        <button onClick={handleToggle}>Add/Edit</button>}
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