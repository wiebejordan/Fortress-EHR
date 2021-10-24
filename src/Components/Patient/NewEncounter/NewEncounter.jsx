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
        
       
        <div>
         <Grid container direction='column' justify='space-around' alignItems='center' style={{height: '550px'}}  >
         <Grid container justify='space-around' >
           <Grid container direction='column' xs={3}>
          <TextField type='date' onChange={(e) => handleInput(e)}
          name='encounterdts' value={newEnc.encounterdts}
          label={lang ? 'Encounter Date' : 'Fecha de Encuentro'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          InputLabelProps={{ shrink: true }}
          />

          
          <TextField onChange={(e) => handleInput(e)}
          type='number'
          name='weight_lbs' defaultValue={newEnc.weight_lbs}
          label={lang ? 'Weight' : 'Peso'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

          
          <TextField onChange={(e) => handleInput(e)}
          type='number'
          name='height_inch' defaultValue={newEnc.height_inch}
          label={lang ? 'Height' : 'Altura'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

     
          
          <TextField onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          defaultValue={newEnc.systolic_bp}
          label={lang ? 'Systolic BP' : 'Presión Arterial Sistólica'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />
          </Grid>
          <Grid container direction='column' xs={3}>
          <TextField onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          defaultValue={newEnc.diastolic_bp}
          label={lang ? 'Diastolic BP' : 'Presión Arterial Diastólica'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

        
          <TextField onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          defaultValue={newEnc.heart_rate}
          label={lang ? 'Heart Rate' : 'Ritmo Cardiaco'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />

          
          <TextField onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          defaultValue={newEnc.respirations_min}
          label={lang ? 'Respirations /min' : 'Respiraciones Por Minuto'} variant='outlined'
          style={{marginTop: '10px', marginBottom: '10px'}}
          />
          </Grid>
         </Grid>

         
           
         <Grid container direction='column' alignItems='center'>
          <TextField
          multiline
          label={lang ? 'Encounter Notes' : 'Notas de Encuentro'}
          variant='outlined'
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{width: '800px'}}
          rows={4}
          defaultValue={newEnc.commenttxt}
          />
       
        
          <Button style={{margin: '25px'}} variant='contained' onClick={handleSubmit} children={lang ? 'Submit New Encounter' : 'Enviar Nuevo Encuentro'}/>

         </Grid>
         
          </Grid>
        </div>
        
       


      </div>
    </div>
  )
}

export default NewEncounter;