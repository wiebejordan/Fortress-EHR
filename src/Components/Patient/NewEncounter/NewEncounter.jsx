import axios from 'axios';
import { parseInt, stubFalse } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {usePrompt, useBlocker} from 'react-router-dom';
import { Prompt } from 'react-router-dom';
import {Button, Icon, Input, Form, TextArea, Grid} from 'semantic-ui-react';


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
          
          <Button icon onClick={props.handlePopout}>
            <Icon name='external alternate'/>
          </Button>
          
          </div>
        : 
        <div>
          <h2>Nuevo Encuentro</h2>
          <Button icon onClick={props.handlePopout}>
            <Icon name='external alternate'/>
          </Button>
          </div>
        }
        
        {lang === true
        ?
        <div>
         <Grid container centered stackable verticalAlign='middle'  >
           <Grid.Row columns={2} >
          <Grid.Column> 
          <Input type='date' onChange={(e) => handleInput(e)}
          name='encounterdts' defaultValue={newEnc.encounterdts}
          label='Date' labelPosition='left '
          />

          
          <Input onChange={(e) => handleInput(e)}
          type='number'
          name='weight_lbs' defaultValue={newEnc.weight_lbs}
          label='Weight' labelPosition='left '
          />

          
          <Input onChange={(e) => handleInput(e)}
          type='number'
          name='height_inch' defaultValue={newEnc.height_inch}
          label='Height' labelPosition='left '
          />

          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
          
          <Input onChange={(e) => handleNumberInput(e)}
          name='systolic_bp'
          type='number'
          defaultValue={newEnc.systolic_bp}
          label='Systolic BP' labelPosition='left '
          />

        
          <Input onChange={(e) => handleNumberInput(e)}
          name='diastolic_bp'
          type='number'
          defaultValue={newEnc.diastolic_bp}
          label='Diastolic BP' labelPosition='left '
          />

        
          <Input onChange={(e) => handleNumberInput(e)}
          name='heart_rate'
          type='number'
          defaultValue={newEnc.heart_rate}
          label='Heart Rate' labelPosition='left '
          />

          
          <Input onChange={(e) => handleNumberInput(e)}
          name='respirations_min'
          type='number'
          defaultValue={newEnc.respirations_min}
          label='Respirations /min' labelPosition='left '
          />
          </Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign='middle'>
           
          <Form>
          <TextArea
          onChange={(e) => handleInput(e)}
          name='commenttxt'
          style={{resize: 'none', width: '100%', height: '200px', overflow: 'auto'}}
          defaultValue={newEnc.commenttxt}
          />
          </Form>
          </Grid.Row>
          
          <Grid.Row>
          <Button onClick={handleSubmit}>Submit New Encounter</Button>
          </Grid.Row>
          </Grid>
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