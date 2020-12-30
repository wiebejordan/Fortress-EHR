import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Medications = (props) => {

  const [newMed, setNewMed] = useState( {medicationnm: '', medicationdsc: '', routedsc: '', effectivestartdts: '', effectiveenddts: ''}),
        [editView, setEditView] = useState(false),
  
        lang = useSelector(state => state.languageReducer.english),
        {meds, patient} = props;
        console.log(newMed);
  
        if(meds === []){
          return(
            <div>
              <p>This patient has not had any medications.</p>
            </div>
          )
        }
        
        const handleToggle = () => {
          setEditView(!editView)
        }

        const handleInput = (e, result) => {
          const {name, value} = result || e.target;
          setNewMed({...newMed, [name]: value})
        
          if(name === 'routedsc'){
            setNewMed({...newMed, routedsc: `zz_${value}`})
          }
        };

        const submitMed = () => {
          const {medicationnm, medicationdsc, routedsc, effectivestartdts, effectiveenddts} = newMed;
    
          axios.post('/api/newmedication', {patientid: patient.patientid, medicationnm, medicationdsc, routedsc, effectivestartdts, effectiveenddts })
          
          .then(() => {
            if(lang === true){
              alert('new medication added!')
      
            }
            else{
              alert('Nuevo medicamento agregada!')
            }
            window.location.reload(true)
          })
          .catch(err => console.log(err));
        }

    return (
      <div style={{height: '400px', width: 'auto', overflow: 'auto'}}>
      
      {lang === true
      ?
      <div className='enc-table-container'>
          <table className='enc-table'>
            <thead className='enc-head'>
            <tr className='enc-tr'>
              <th className='enc-th'>Medication Name</th>
              <th className='enc-th'>Description</th>
              <th className='enc-th'>Route</th>
              <th className='enc-th'>Start Date</th>
              <th className='enc-th'>End Date</th>
            </tr>
            </thead>
          
        {meds.map((med) => 
            <tbody className='enc-tr' key={med.medicationid} value={med}>
            
            <tr className='enc-tr'>
            <td className='enc-td'>{med.medicationnm.substr(0, 10)}</td>
            <td className='enc-td'>{med.medicationdsc}</td>
            <td className='enc-td'>{med.routedsc}</td>
            <td className='enc-td'>{med.effectivestartdts.substr(0, 10)}</td>
            <td className='enc-td'>{med.effectiveenddts.substr(0, 10)}</td>
            </tr>
            </tbody>
        )}
          </table>

          {editView
        ?
        <div>
        <p>Start Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='effectivestartdts' 
          />

        <p>End Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='effectiveenddts' 
          />      
        <p>Medication Name:</p>
        <input name='medicationnm' placeholder='Flu, polio, etc' onChange={(e) => handleInput(e)}/>
        <p>Medication Description:</p>
        <input name='medicationdsc' placeholder='injection, etc.' onChange={(e) => handleInput(e)}/>
        <p>Route:</p>
        <input name='routedsc' placeholder='injection, etc.' onChange={(e) => handleInput(e)}/>
        
        <button onClick={handleToggle}>Cancel</button>
        <button onClick={submitMed} >Submit Medication</button>
        </div>
        :
          <button style={{marginTop: '20px'}} onClick={handleToggle}>Add Medication</button>
          }
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div className='enc-table-container'>
      <table className='enc-table'>
        <thead className='enc-head'>
        <tr className='enc-tr'>
          <th className='enc-th'>Nombre del Medicamento</th>
          <th className='enc-th'>Descripción</th>
          <th className='enc-th'>Método de Entrega </th>
          <th className='enc-th'>Fecha de Inicio</th>
          <th className='enc-th'>Fecha Final</th>
        </tr>
        </thead>
      
    {meds.map((med) => 
        <tbody className='enc-tr' key={med.medicationid} value={med}>
        
        <tr className='enc-tr'>
        <td className='enc-td'>{med.medicationnm.substr(0, 10)}</td>
        <td className='enc-td'>{med.medicationdsc}</td>
        <td className='enc-td'>{med.routedsc}</td>
        <td className='enc-td'>{med.effectivestartdts.substr(0, 10)}</td>
        <td className='enc-td'>{med.effectiveenddts.substr(0, 10)}</td>
        </tr>
        </tbody>
    )}
      </table>
      <button style={{marginTop: '20px'}}>Agregar Medicación</button>
  </div>
      }
      </div>
    )
  }


export default Medications;