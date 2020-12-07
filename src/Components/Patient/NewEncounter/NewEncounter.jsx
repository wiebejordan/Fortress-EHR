import { parseInt } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const NewEncounter = (props) => {

  const [encounter, setEncounter] = useState({patientid: null, encounterdts: '', weight_lbs: '', height_inch: '', systolic_bp: null, diastolic_bp: null, heart_rate: null, respirations_min: null, commenttxt: ''}),

  lang = useSelector(state => state.languageReducer.english);

  console.log(encounter)

  useEffect(() => {
    setEncounter({...encounter, patientid: props.patient.patientid})
  }, [])

  const handleInput = (e, result) => {
    const {name, value} = result || e.target;
    setEncounter({...encounter, [name]: value});
  };

  const handleNumberInput = (e, result) => {
    const {name, value} = result || e.target;
    setEncounter({...encounter, [name]: parseInt(value)});
  };

  return(
    <div>
      <div>
        <h2>New Encounter</h2>
        {lang === true
        ?
        <form>
          <p>Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='encounterdts'
          />

          <p>Weight</p>
          <input onChange={(e) => handleInput(e)}
          name='weight_lbs'
          />

          <p>Height</p>
          <input onChange={(e) => handleInput(e)}
          name='height_inch'
          />


          <p>Systolic BP</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          />

          <p>Diastolic BP</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          />

          <p>Heart Rate</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          />

          <p>Respirations per min</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          />

          <p>Encounter Notes</p>
          <textarea
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'scroll'}}
          />


        </form>
        
        :
        
        
        <form>
          <p>Fecha del Encuentro</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='encounterdts'/>

          <p>Peso</p>
          <input onChange={(e) => handleInput(e)}
          name='weight_lbs'
          />

          <p>Altura</p>
          <input onChange={(e) => handleInput(e)}
          name='height_inch'
          />

          <p>Presión Arterial Sistólica</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          />

          <p>Presión Arterial Diastólica</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          />

          <p>Ritmo Cardiaco</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          />

          <p>Respiraciones Por Minuto</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          />

          <p>Notas de Encuentro</p>
          <textarea
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'scroll'}}
          />


        </form>
        }

      </div>
    </div>
  )
}

export default NewEncounter;