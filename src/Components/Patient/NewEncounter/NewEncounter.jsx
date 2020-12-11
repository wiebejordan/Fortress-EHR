import axios from 'axios';
import { parseInt } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {usePrompt, useBlocker} from 'react-router-dom';

const NewEncounter = (props) => {

  const [encounter, setEncounter] = useState({patientid: props.patient.patientid, encounterdts: '', weight_lbs: '', height_inch: '', systolic_bp: null, diastolic_bp: null, heart_rate: null, respirations_min: null, commenttxt: ''}),
        [isBlocking, setIsBlocking] = useState(false),
        

  lang = useSelector(state => state.languageReducer.english),
  newEnc = useSelector(state => state.newEncReducer.newEncounter),
  dispatch = useDispatch();

  console.log('reducer', newEnc)
  console.log('encounter', encounter)

  // usePrompt(
  //   "Hello from usePrompt -- Are you sure you want to leave?",
  //   isBlocking
  // );

  useEffect(() => {
    setEncounter({...newEnc, patientid: props.patient.patientid})
  }, [])

  useEffect(() => {
    dispatch({
      type: 'NEW_ENC',
      payload: {...encounter, patientid: props.patient.patientid}
    })
  }, [encounter])

  const handleInput = (e, result) => {
    const {name, value} = result || e.target;
    setEncounter({...encounter, [name]: value})
    
  };

  const handleNumberInput = (e, result) => {
    const {name, value} = result || e.target;
    setEncounter({...encounter, [name]: value})
  };

  const handleSubmit = () => {
    const {patientid, encounterdts, weight_lbs, height_inch, systolic_bp, diastolic_bp, heart_rate, respirations_min, commenttxt} = encounter;

    axios.post('/api/newencounter', {patientid, encounterdts, weight_lbs, height_inch, systolic_bp, diastolic_bp, heart_rate, respirations_min, commenttxt})

    .then(() => {
      dispatch({
        type: 'CLEAR_ENC',
        payload: {
          patientid: null, 
          encounterdts: '', 
          weight_lbs: '', 
          height_inch: '', 
          systolic_bp: null, 
          diastolic_bp: null, 
          heart_rate: null, 
          respirations_min: null, 
          commenttxt: ''
        } 
      })
      if(lang === true){
        alert('new encounter added!')

      }
      else{
        alert('Nuevo encuentro agregada!')
      }
      window.location.reload(true)
    })
    .catch(err => console.log(err));
    
  }

  

  return(
    <div>
      <div>
        {lang === true
        ? <h2>New Encounter</h2>
        : 
        <h2>Nuevo Encuentro</h2>
        }
        
        {lang === true
        ?
        <div>
          <p>Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='encounterdts' defaultValue={newEnc.encounterdts}
          />

          <p>Weight</p>
          <input onChange={(e) => handleInput(e)}
          type='number'
          name='weight_lbs' defaultValue={newEnc.weight_lbs}
          />

          <p>Height</p>
          <input onChange={(e) => handleInput(e)}
          type='number'
          name='height_inch' defaultValue={newEnc.height_inch}
          />


          <p>Systolic BP</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          defaultValue={newEnc.systolic_bp}
          />

          <p>Diastolic BP</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          defaultValue={newEnc.diastolic_bp}
          />

          <p>Heart Rate</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          defaultValue={newEnc.heart_rate}
          />

          <p>Respirations per min</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          defaultValue={newEnc.respirations_min}
          />

          <p>Encounter Notes</p>
          <textarea
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'scroll'}}
          defaultValue={newEnc.commenttxt}
          />

          <button onClick={handleSubmit}>Submit New Encounter</button>
        </div>
        
        :
        
        
        <div>
          <p>Fecha del Encuentro</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='encounterdts' defaultValue={newEnc.encounterdts}/>

          <p>Peso</p>
          <input onChange={(e) => handleInput(e)}
          name='weight_lbs' defaultValue={newEnc.weight_lbs}
          />

          <p>Altura</p>
          <input onChange={(e) => handleInput(e)}
          name='height_inch'
          defaultValue={newEnc.height_inch}
          />

          <p>Presión Arterial Sistólica</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          defaultValue={newEnc.systolic_bp}
          />

          <p>Presión Arterial Diastólica</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          defaultValue={newEnc.diastolic_bp}
          />

          <p>Ritmo Cardiaco</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          defaultValue={newEnc.heart_rate}
          />

          <p>Respiraciones Por Minuto</p>
          <input onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          defaultValue={newEnc.respirations_min}
          />

          <p>Notas de Encuentro</p>
          <textarea
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'scroll'}}
          defaultValue={newEnc.commenttxt}
          />

        <button onClick={handleSubmit}>Enviar Nuevo Encuentro</button>
        </div>
        }

      </div>
    </div>
  )
}

export default NewEncounter;