import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import DataTable from '../../Global/data-table.component'

const Medications = (props) => {

  const [newMed, setNewMed] = useState( {medicationnm: '', medicationdsc: '', routedsc: '', effectivestartdts: '', effectiveenddts: ''}),
        [editView, setEditView] = useState(false),
  
        lang = useSelector(state => state.languageReducer.english),
        {meds, patient} = props;
        console.log(meds);
  
       
        
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

        const columns = [
          
          {
            label: 'Medication Name',
            name: 'medicationnm'
          },
          {
            label: 'Description',
            name: 'medicationdsc'
          },
          {
            label: 'Route',
            name: 'routedsc'
          },
          {
            label: 'Start Date',
            name: 'effectivestartdts',
            options: {
              customBodyRender: (record, index) => {
                return record.substr(0, 10)
              }
            }
          },
          {
            label: 'End Date',
            name: 'effectiveenddts',
            options: {
              customBodyRender: (record, index) => {
                return record.substr(0, 10)
              }
            }
          },
         
        ]
    
      
        const options = {
          download: false,
          enableNestedDataAccess: '.',
          print: false,
          selectableRows: 'none',
          tableBodyHeight: 'auto',
          searchOpen: false,
          viewColumns: false,
        }
  

    return (
      <div style={{height: '400px', width: 'auto', overflow: 'auto'}}>
      
      {lang === true
      ?
      <div className='enc-table-container'>
     

          <DataTable data={meds} columns={columns} options={options} />

          {meds.length === 0 
        ? <p>{patient.firstnm} has no medications on record.</p>
        
        : null}

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
        <input name='medicationnm' placeholder='Tylenol, Adderal, etc' onChange={(e) => handleInput(e)}/>
        <p>Medication Description:</p>
        <input name='medicationdsc' placeholder='For joint pain, etc.' onChange={(e) => handleInput(e)}/>
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

      {meds.length === 0 
        ? <p>{patient.firstnm} no tiene medicamentos registrados.</p>
        
        : null}

      {editView
        ?
        <div>
        <p>Fecha de Inicio:</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='effectivestartdts' 
          />

        <p>Fecha Final:</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='effectiveenddts' 
          />      
        <p>Nombre del Medicamento:</p>
        <input name='medicationnm' placeholder='Tylenol, Adderal, etc' onChange={(e) => handleInput(e)}/>
        <p>Descripción de la Medicación:</p>
        <input name='medicationdsc' placeholder='para el dolor articular, etc.' onChange={(e) => handleInput(e)}/>
        <p>Método:</p>
        <input name='routedsc' placeholder='inyección, oral, etc.' onChange={(e) => handleInput(e)}/>
        
        <button onClick={handleToggle}>Cancelar</button>
        <button onClick={submitMed} >Enviar medicación</button>
        </div>
        :
          <button style={{marginTop: '20px'}} onClick={handleToggle}>Agregar medicación</button>
          }
  </div>
      }
      </div>
    )
  }


export default Medications;