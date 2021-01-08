import React, { useEffect, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import axios from 'axios';


const PatientOverview = (props) => {
  const [item, setItem] = useState({}),
        [allergyEdit, setAllergyEdit] = useState(false),
        [newAllergy, setNewAllergy] = useState({typedsc: '', createdts: '', allergydsc: '', severitydsc: '', reactiondsc: ''}),
        lang = useSelector(state => state.languageReducer.english),
        {user, patient, encounters, allergies} = props
        console.log(allergies)

    
 
    const handleToggle = () => {
      setAllergyEdit(!allergyEdit)
    }

    const handleInput = (e, result) => {
      const {name, value} = result || e.target;
      setNewAllergy({...newAllergy, [name]: value})

      if(name === 'reactiondsc'){
        setNewAllergy({...newAllergy, reactiondsc: `zz_${value}`})
      }
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
        <h1 style={{textAlign: 'center'}}>
        Patient Overview
          </h1>
        <p>Birthdate: <b>{patient.birthdts.substr(0, 10)}</b></p>
        <p>Gender: <b>{patient.genderdsc}</b> </p>
        <p>Latest Encounter Date: <b>{encounters[encounters.length-1].encounterdts}</b></p>
        <p>Recent Notes: <b>{encounters[encounters.length-1].commenttxt}</b></p>

        {/* <h3>Active Problems</h3> */}
        <h3>Allergies</h3>
        
        <>
        <table className='enc-table'>
            <thead className='enc-head'>
            <tr className='enc-tr'>
              <th className='enc-th'>Date Added</th>
              <th className='enc-th'>Allergy Type</th>
              <th className='enc-th'>Severity</th>
              <th className='enc-th'>Reactions</th>
            </tr>
            </thead>
          
        {allergies.map((allergy) => 
            <tbody className='enc-tr' key={allergy.immunizationid} value={allergy}>
            
            <tr className='enc-tr'>
            <td className='enc-td'>{allergy.createdts.substr(0, 10)}</td>
            <td className='enc-td'>{allergy.typedsc}</td>
            <td className='enc-td'>{allergy.severitydsc}</td>
            <td className='enc-td'>{allergy.reactiondsc}</td>
            </tr>
            </tbody>
        )}
          </table>

          
        </>
        {allergies.length === 0 
        ? <p>This patient has no allergies on record</p>
        
        : null}

        {allergyEdit
        ?
        <div>
        <p>Today's Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='createdts' 
          />
        <p>Allergy Type:</p>
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
        <button style={{marginTop: '20px'}} onClick={handleToggle} disabled={user.user.canedit === false}>Add/Edit</button>
        }
        
        
        
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
        <h1 style={{textAlign: 'center'}}>
        Resumen del Paciente
          </h1>
        <p>Fecha de Nacimiento: <b>{patient.birthdts.substr(0, 10)}</b></p>
        <p>Género: <b>{patient.genderdsc}</b></p>
        <p>Fecha Del último Encuentro: <b>{encounters[encounters.length-1].encounterdts}</b></p>
        <p>Notas Recientes: <b>{encounters[encounters.length-1].commenttxt}</b></p>
        <h3>Alergias</h3>
        
        <>
        <table className='enc-table'>
            <thead className='enc-head'>
            <tr className='enc-tr'>
              <th className='enc-th'>Fecha Agregada</th>
              <th className='enc-th'>Tipo de Alergia</th>
              <th className='enc-th'>Gravedad</th>
              <th className='enc-th'>Reacciones</th>
            </tr>
            </thead>
          
        {allergies.map((allergy) => 
            <tbody className='enc-tr' key={allergy.immunizationid} value={allergy}>
            
            <tr className='enc-tr'>
            <td className='enc-td'>{allergy.createdts.substr(0, 10)}</td>
            <td className='enc-td'>{allergy.typedsc}</td>
            <td className='enc-td'>{allergy.severitydsc}</td>
            <td className='enc-td'>{allergy.reactiondsc}</td>
            </tr>
            </tbody>
        )}
          </table>

          
        </>
        
        {allergies.length === 0 
        ? <p>Este paciente no tiene alergias registradas.</p>
        
        : null}
        
        {allergyEdit
        ?
        <div>
        <p>Fecha</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='createdts' 
          />
        <p>Tipo de Alergias:</p>
        <input name='typedsc' placeholder='comida, animal, medicina...' onChange={(e) => handleInput(e)}/>
        <p>Alergia:</p>
        <input name='allergydsc' placeholder='Abejas, cacahuetes ...' onChange={(e) => handleInput(e)}/>
        <p>Gravedad:</p>
        <input type='radio' value='mild' name='severitydsc' onChange={(e) => handleInput(e)}/>
        <label>Leve</label><br/>
        <input type='radio' value='moderate' name='severitydsc' onChange={(e) => handleInput(e)}/>
        <label>Moderado</label><br/>
        <input type='radio' value='Severe' name='severitydsc' onChange={(e) => handleInput(e)}/>
        <label>Severo</label><br/>
        <p>Reacciones:</p>
        <input name='reactiondsc' placeholder='vómito, sarpullido...' onChange={(e) => handleInput(e)}/>
        <button onClick={handleToggle}>Cancelar</button>
        <button onClick={submitAllergy}>Enviar Alergia</button>
        </div>
        : <button style={{marginTop: '20px'}} onClick={handleToggle} disabled={user.user.canedit === false}>Add/Edit</button>
        }
        
        
      </div>
      }
      </div>
    )
  }


export default PatientOverview;