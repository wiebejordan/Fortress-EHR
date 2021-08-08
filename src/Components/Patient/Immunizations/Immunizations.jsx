import React, { useEffect, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import DataTable from '../../Global/data-table.component'

const IMMUNIZATION = (props) => {
  const [item, setItem] = useState('overview'),
        [immunes, setImmunes] = useState([]),
        [editView, setEditView] = useState(false),
        [newImmune, setNewImmune] = useState({createdts: '', immunizationtypedsc: '', routedsc: ''}),
        
        {patient, user} = props,
        lang = useSelector(state => state.languageReducer.english)
        console.log(immunes)


    useEffect(() => {
      setImmunes(props.immunes)
    }, [])

    const handleInput = (e, result) => {
      const {name, value} = result || e.target;
      setNewImmune({...newImmune, [name]: value})

      if(name === 'routedsc'){
        setNewImmune({...newImmune, routedsc: `zz_${value}`})
      }
    };

    const handleToggle = () => {
      setEditView(!editView)
    }

    const submitImmune = () => {
      const {createdts, immunizationtypedsc, routedsc} = newImmune;

      axios.post('/api/newimmune', {patientid: patient.patientid, createdts, immunizationtypedsc, routedsc })
      
      .then(() => {
        if(lang === true){
          alert('new immunization added!')
  
        }
        else{
          alert('Nueva inmunización agregada!')
        }
        window.location.reload(true)
      })
      .catch(err => console.log(err));
    }


    if(immunes === []){
      return(
        <div>
          <p>This patient has not had any immunizations.</p>
        </div>
      )
    }

    const columns = [
      {
        label: 'Immunization Date',
        name: 'createdts',
        options: {
          customBodyRender: (record, index) => {
            return record.substr(0, 10)
          }
        }
      },
      {
        label: 'Immunization Type',
        name: 'immunizationtypedsc'
      },
      {
        label: 'Route',
        name: 'routedsc'
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
      <div style={{height: '400px', width: 'auto', overflow:'auto'}}>
      

      {lang === true
      ?
      <div>
      

          <DataTable data={immunes} columns={columns} options={options} />
        {editView
        ?
        <div>
        <p>Today's Date</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='createdts' 
          />
        <p>Immunization Type:</p>
        <input name='immunizationtypedsc' placeholder='Flu, polio, etc' onChange={(e) => handleInput(e)}/>
        <p>Route:</p>
        <input name='routedsc' placeholder='injection, etc.' onChange={(e) => handleInput(e)}/>
        
        <button onClick={handleToggle}>Cancel</button>
        <button onClick={submitImmune}>Submit Immunization</button>
        </div>
        :
        <button style={{marginTop: '20px'}} onClick={handleToggle} disabled={user.user.canedit === false}>Add/Edit</button>}
        

        {immunes.length === 0 
        ? <p>This patient has not had any immunizations.</p>
        : null}
        
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
        <table className='enc-table'>
            <thead className='enc-head'>
            <tr className='enc-tr'>
              <th className='enc-th'>fecha de inmunización</th>
              <th className='enc-th'>tipo de inmunización</th>
              <th className='enc-th'>Método de Inmunización</th>
            </tr>
            </thead>
          
        {immunes.map((immune) => 
            <tbody className='enc-tr' key={immune.immunizationid} value={immune}>
            
            <tr className='enc-tr'>
            <td className='enc-td'>{immune.createdts.substr(0, 10)}</td>
            <td className='enc-td'>{immune.immunizationtypedsc}</td>
            <td className='enc-td'>{immune.routedsc}</td>
            </tr>
            </tbody>
        )}
          </table>
        {editView
        ?
        <div>
        <p>Fecha:</p>
          <input type='date' onChange={(e) => handleInput(e)}
          name='createdts' 
          />
        <p>Tipo de Inmunización:</p>
        <input name='immunizationtypedsc' placeholder='Gripe, polio, etc' onChange={(e) => handleInput(e)}/>
        <p>Método de Inmunización:</p>
        <input name='routedsc' placeholder='inyección, etc.' onChange={(e) => handleInput(e)}/>
        
        <button onClick={handleToggle}>Cancelar</button>
        <button onClick={submitImmune}>Enviar Inmunización</button>
        </div>
        :
        <button style={{marginTop: '20px'}} onClick={handleToggle} disabled={user.user.canedit === false}>Add/Edit</button>}
        

        {immunes.length === 0 
        ? <p>Este paciente no ha tenido ninguna inmunización.</p>
        : null}
        
      </div>
      }
      </div>
    )
  }


export default IMMUNIZATION;