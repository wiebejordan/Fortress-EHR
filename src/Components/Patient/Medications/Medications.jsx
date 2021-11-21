import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
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
            label: lang === true ? 'Medication Name' : 'Nombre del Medicamento',
            name: 'medicationnm'
          },
          {
            label: lang === true ? 'Description' : 'Descripción',
            name: 'medicationdsc'
          },
          {
            label: lang === true ? 'Route' : 'Método de Entrega',
            name: 'routedsc'
          },
          {
            label: lang === true ? 'Start Date' : 'Fecha de Inicio',
            name: 'effectivestartdts',
            options: {
              customBodyRender: (record, index) => {
                return record.substr(0, 10)
              }
            }
          },
          {
            label: lang === true ? 'End Date' : 'Fecha Final',
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
          textLabels: {
            body: {
              noMatch: `${patient.firstnm} has no medications on record.`
            }
          }
        }
  

    return (
      <div style={{height: '400px', width: 'auto', overflow: 'auto'}}>
      
      {lang === true
      ?
      <div className='enc-table-container'>
     

          <DataTable data={meds} columns={columns} options={options} title='Medications' />

         

          {editView
        ?
     
           <Grid style={{marginTop: '25px', marginBottom: '25px'}} container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>New Medication Form</h2>
        <Grid container justifyContent='center' alignItems='center'>
         
          <Grid container direction='column' alignItems='center' xs={3}>
        <TextField
            variant="outlined"
            type="date"
            label="Start Date"
            onChange={(e) => handleInput(e)}
            name="effectivestartdts"
            style={{marginBottom: '20px'}}
            InputLabelProps={{ shrink: true }}
          />

<TextField
            variant="outlined"
            type="date"
            label="End Date"
            onChange={(e) => handleInput(e)}
            name="effectiveenddts"
            style={{marginBottom: '20px'}}
            InputLabelProps={{ shrink: true }}
          />
   
        <TextField
            variant="outlined"
            label="Medication Name"
            onChange={(e) => handleInput(e)}
            name="medicationnm"
            style={{marginBottom: '20px'}}
          />



        </Grid>

        
        
        <Grid container direction='column' justifyContent='flex-start' alignItems='center' xs={3}>
        <TextField
            variant="outlined"
            label="Medication Description"
            onChange={(e) => handleInput(e)}
            name="medicationdsc"
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
        <Button onClick={submitMed} children={'Submit Medication'} variant='contained' />
        </Grid>
        </Grid>
        </Grid>
       
        :
          <Button style={{marginTop: '20px', marginBottom: '25px'}} variant='contained' onClick={handleToggle}>Add Medication</Button>
          }
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div className='enc-table-container'>
     <DataTable data={meds} columns={columns} options={options} title='Medications' />

      {editView
        ?
        <Grid style={{marginTop: '25px', marginBottom: '25px'}} container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>Nueva Forma de Medicación</h2>
        <Grid container justifyContent='center' alignItems='center'>
         
          <Grid container direction='column' alignItems='center' xs={3}>
        <TextField
            variant="outlined"
            type="date"
            label="Fecha de Inicio"
            onChange={(e) => handleInput(e)}
            name="effectivestartdts"
            style={{marginBottom: '20px'}}
            InputLabelProps={{ shrink: true }}
          />

<TextField
            variant="outlined"
            type="date"
            label="Fecha Final"
            onChange={(e) => handleInput(e)}
            name="effectiveenddts"
            style={{marginBottom: '20px'}}
            InputLabelProps={{ shrink: true }}
          />
   
        <TextField
            variant="outlined"
            label="Nombre del Medicamento"
            onChange={(e) => handleInput(e)}
            name="medicationnm"
            style={{marginBottom: '20px'}}
          />



        </Grid>

        
        
        <Grid container direction='column' justifyContent='flex-start' alignItems='center' xs={3}>
        <TextField
            variant="outlined"
            label="Descripción"
            onChange={(e) => handleInput(e)}
            name="medicationdsc"
            style={{marginBottom: '20px'}}
          />

<TextField
            variant="outlined"
            label="Método"
            onChange={(e) => handleInput(e)}
            name="routedsc"
            style={{marginBottom: '20px'}}
          />
       </Grid>
       <Grid container justifyContent='center'>
        <Button style={{marginRight: '20px'}} onClick={handleToggle} children={'Cancel'} variant='contained'/>
        <Button onClick={submitMed} children={'Submit Medication'} variant='contained' />
        </Grid>
        </Grid>
        </Grid>
       
        :
          <Button variant='contained' style={{marginTop: '20px'}} onClick={handleToggle}>Agregar medicación</Button>
          }
  </div>
      }
      </div>
    )
  }


export default Medications;