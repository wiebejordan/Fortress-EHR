import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const NewEncounter = () => {

  const [encounter, setEncounter] = useState({patientid: null, encounterdts: '', weight_lbs: '', height_inch: '', systolic_bp: null, diastolic_bp: null, heart_rate: null, respirations_min: null, commenttxt: ''}),

  lang = useSelector(state => state.languageReducer.english);

  return(
    <div>
      <div>
        <h2>New Encounter</h2>
        {lang === true
        ?
        <form>
          <p>Date</p>
          <input type='date'/>

          <p>Weight</p>
          <input/>

          <p>Height</p>
          <input/>

          <p>Systolic BP</p>
          <input/>

          <p>Diastolic BP</p>
          <input/>

          <p>Heart Rate</p>
          <input/>

          <p>Respirations per min</p>
          <input/>

          <p>Encounter Notes</p>
          <textarea
          
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'scroll'}}
          />


        </form>
        
        :
        
        
        <form>
          <p>Fecha del Encuentro</p>
          <input type='date'/>

          <p>Peso</p>
          <input/>

          <p>Altura</p>
          <input/>

          <p>Presión Arterial Sistólica</p>
          <input/>

          <p>Presión Arterial Diastólica</p>
          <input/>

          <p>Ritmo Cardiaco</p>
          <input/>

          <p>Respiraciones Por Minuto</p>
          <input/>

          <p>Notas de Encuentro</p>
          <textarea
          
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'scroll'}}
          />


        </form>
        }

      </div>
    </div>
  )
}

export default NewEncounter;