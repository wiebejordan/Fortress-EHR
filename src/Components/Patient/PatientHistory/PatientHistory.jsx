import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

const PatientHistory = (props) => {
  const [item, setItem] = useState('overview'),
        [editView, setEditView] = useState(false),
        [history, setHistory] = useState(props.patient.history),
        lang = useSelector(state => state.languageReducer.english)
        console.log(history)

  
    const toggleEdit = () => {
      setEditView(!editView)
    }

    const handleInput = (e, result) => {
      const {name, value} = result || e.target;
      setHistory(`${value } - ${props.user.user.firstnm} ${props.user.user.lastnm}`);
    };

    const handleHistoryEdit = () => {
      axios.put(`/api/edithistory/${props.patient.patientid}`, {history: history})
      
      .then(() => {
        if(lang === true){
          alert('Patient history updated!')
  
        }
        else{
          alert('Historial del paciente actualizado!')
        }
        window.location.reload(true)
      })
      .catch(err => console.log(err))
    }
  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>
        <h3>Patient History</h3>
        <p>{props.patient.history}</p>

        {editView
        ? <div>
          <textarea defaultValue={props.patient.history} onChange={handleInput} style={{resize: 'none', width: '90%', height: '200px'}}/>
          <button onClick={toggleEdit}>Cancel</button>
          <button onClick={handleHistoryEdit}>Save Changes</button>
        </div>
        : null}
        
        {props.user.user.canedit && !editView
        ? 
        <button onClick={toggleEdit}>edit</button>
        : false}
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
        <h3>Historial de Paciente</h3>
        <p>{props.patient.history}</p>
      </div>
      }
      </div>
    )
  }


export default PatientHistory;