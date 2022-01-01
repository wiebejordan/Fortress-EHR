import React, { useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
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
        label: lang === true ? 'Immunization Date' : 'Fecha de Vacunación',
        name: 'createdts',
        options: {
          customBodyRender: (record, index) => {
            return record.substr(0, 10)
          }
        }
      },
      {
        label: lang === true ? 'Immunization Type' : 'Tipo de Vacunación',
        name: 'immunizationtypedsc'
      },
      {
        label: lang === true ? 'Route' : 'Método',
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
      textLabels: {
        body: {
          noMatch: `${patient.firstnm} has no immunizations on record.`
        }
      }
    }


    return (
      <div style={{height: '400px', width: 'auto', overflow:'auto'}}>
      

      {lang === true
      ?
      <div>
      

          <DataTable data={immunes} columns={columns} options={options} title='Immunizations' />
        {editView
        ?
       
           <Grid style={{marginTop: '25px', marginBottom: '25px'}} container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>New Immunization Form</h2>
        <Grid container justifyContent='center' alignItems='center'>
         
          <Grid container direction='column' alignItems='center' xs={3}>
        <TextField
            variant="outlined"
            type="date"
            label="Today's Date"
            onChange={(e) => handleInput(e)}
            name="createdts"
            style={{marginBottom: '20px'}}
            InputLabelProps={{ shrink: true }}
          />

<TextField
            variant="outlined"
            label="Immunization Type"
            onChange={(e) => handleInput(e)}
            name="immunizationtypedsc"
            style={{marginBottom: '20px'}}
            
          />
   
        <TextField
            variant="outlined"
            label="Route"
            onChange={(e) => handleInput(e)}
            name="routedsc"
            style={{marginBottom: '20px'}}
          />



        </Grid>

        
        
       
       <Grid container justifyContent='center'>
        <Button style={{marginRight: '20px'}} onClick={handleToggle} children={'Cancel'} variant='contained'/>
        <Button onClick={submitImmune} children={'Submit Immunization'} variant='contained' />
        </Grid>
        </Grid>
        </Grid>
        
        :
        <Button style={{marginTop: '20px'}} variant='contained' onClick={handleToggle} disabled={user.user.canedit === false}>Add/Edit</Button>}
        

        
        
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
      

          <DataTable data={immunes} columns={columns} options={options} title='Immunizations' />
        {editView
        ?
       
           <Grid style={{marginTop: '25px', marginBottom: '25px'}} container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>Nuevo formulario de vacunación</h2>
        <Grid container justifyContent='center' alignItems='center'>
         
          <Grid container direction='column' alignItems='center' xs={3}>
        <TextField
            variant="outlined"
            type="date"
            label="Fecha"
            onChange={(e) => handleInput(e)}
            name="createdts"
            style={{marginBottom: '20px'}}
            InputLabelProps={{ shrink: true }}
          />

<TextField
            variant="outlined"
            label="Tipo de Inmunización"
            onChange={(e) => handleInput(e)}
            name="immunizationtypedsc"
            style={{marginBottom: '20px'}}
            
          />
   
        <TextField
            variant="outlined"
            label="Método de Entrega"
            onChange={(e) => handleInput(e)}
            name="routedsc"
            style={{marginBottom: '20px'}}
          />



        </Grid>

        
        
       
       <Grid container justifyContent='center'>
        <Button style={{marginRight: '20px'}} onClick={handleToggle} children={'Cancelar'} variant='contained'/>
        <Button onClick={submitImmune} children={'Enviar vacunación'} variant='contained' />
        </Grid>
        </Grid>
        </Grid>
        
        :
        <Button style={{marginTop: '20px'}} variant='contained' onClick={handleToggle} disabled={user.user.canedit === false}>Add/Edit</Button>}
        

        
        
      </div>
      }
      </div>
    )
  }


export default IMMUNIZATION;