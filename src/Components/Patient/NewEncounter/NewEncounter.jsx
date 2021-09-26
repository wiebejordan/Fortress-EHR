import axios from 'axios';
import { parseInt, stubFalse } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {usePrompt, useBlocker} from 'react-router-dom';
import { Prompt } from 'react-router-dom';
import {Button, TextField, Grid, IconButton} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';



const NewEncounter = (props) => {

  const [encounter, setEncounter] = useState({patientid: props.patient.patientid, encounterdts: '', weight_lbs: '', height_inch: '', systolic_bp: null, diastolic_bp: null, heart_rate: null, respirations_min: null, commenttxt: ''}),
        

  lang = useSelector(state => state.languageReducer.english),
  newEnc = useSelector(state => state.newEncReducer.newEncounter),
  dispatch = useDispatch();

  // console.log(isBlocking)
  console.log('props', props)

  

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
    
    if(name === 'commenttxt'){
      setEncounter({...encounter, commenttxt: `zz_${value}`})
    }
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
      props.handlePopout()
    })
    .catch(err => console.log(err));
    
  }

  
  

  return(
    <div>
      <div>
        {lang === true
        ? 
        <div>
          <h2>New Encounter</h2>
       <IconButton onClick={props.handlePopout}>

            <OpenInNewIcon />
       </IconButton>
          
          
          </div>
        : 
        <div>
          <h2>Nuevo Encuentro</h2>
         <IconButton onClick={props.handlePopout}>
            <OpenInNewIcon />

         </IconButton>
         
          </div>
        }
        
        {lang === true
        ?
        <div>
         <Grid container direction='column' justify='space-around' alignItems='center' style={{height: '550px'}}  >
         <Grid container justify='space-around' >
           <Grid container direction='column' xs={3}>
          <TextField type='date' onChange={(e) => handleInput(e)}
          name='encounterdts' value={newEnc.encounterdts}
          label='Encounter Date' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          InputLabelProps={{ shrink: true }}
          />

          
          <TextField onChange={(e) => handleInput(e)}
          type='number'
          name='weight_lbs' defaultValue={newEnc.weight_lbs}
          label='Weight' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

          
          <TextField onChange={(e) => handleInput(e)}
          type='number'
          name='height_inch' defaultValue={newEnc.height_inch}
          label='Height' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

     
          
          <TextField onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          defaultValue={newEnc.systolic_bp}
          label='Systolic BP' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />
          </Grid>
          <Grid container direction='column' xs={3}>
          <TextField onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          defaultValue={newEnc.diastolic_bp}
          label='Diastolic BP' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

        
          <TextField onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          defaultValue={newEnc.heart_rate}
          label='Heart Rate' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

          
          <TextField onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          defaultValue={newEnc.respirations_min}
          label='Respirations /min' variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />
          </Grid>
         </Grid>

         
           
         <Grid container direction='column' alignItems='center'>
          <TextField
          multiline
          label='Encounter Notes'
          variant='outlined'
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{width: '800px'}}
          rows={4}
          defaultValue={newEnc.commenttxt}
          />
       
        
          <Button style={{margin: '25px'}} variant='contained' onClick={handleSubmit}>Submit New Encounter</Button>

         </Grid>
         
          </Grid>
        </div>
        
        :
        
        
        <div>
          <p>Fecha del Encuentro</p>
          <TextField type='date' onChange={(e) => handleInput(e)}
          name='encounterdts' defaultValue={newEnc.encounterdts}/>

          <p>Peso</p>
          <TextField onChange={(e) => handleInput(e)}
          name='weight_lbs' defaultValue={newEnc.weight_lbs}
          />

          <p>Altura</p>
          <TextField onChange={(e) => handleInput(e)}
          name='height_inch'
          defaultValue={newEnc.height_inch}
          />

          <p>Presión Arterial Sistólica</p>
          <TextField onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          defaultValue={newEnc.systolic_bp}
          />

          <p>Presión Arterial Diastólica</p>
          <TextField onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          defaultValue={newEnc.diastolic_bp}
          />

          <p>Ritmo Cardiaco</p>
          <TextField onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          defaultValue={newEnc.heart_rate}
          />

          <p>Respiraciones Por Minuto</p>
          <TextField onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          defaultValue={newEnc.respirations_min}
          />

          <p>Notas de Encuentro</p>
          <TextField
          multiline
          label='Encounter Notes'
          variant='outlined'
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'auto'}}
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