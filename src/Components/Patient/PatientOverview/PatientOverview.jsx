import React, { useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";
import {useSelector} from 'react-redux';
import axios from 'axios';
import DataTable from '../../Global/data-table.component'
import {get} from 'lodash'


const PatientOverview = (props) => {
  const [item, setItem] = useState({}),
        [allergyEdit, setAllergyEdit] = useState(false),
        [newAllergy, setNewAllergy] = useState({typedsc: '', createdts: '', allergydsc: '', severitydsc: '', reactiondsc: ''}),
        lang = useSelector(state => state.languageReducer.english),
        {user, patient, encounters, allergies} = props
        

    
 
    const handleToggle = () => {
      setAllergyEdit(!allergyEdit)
    }

    const handleInput = (e, result) => {
      const {name, value} = result || e.target;
      setNewAllergy({...newAllergy, [name]: value})

      if(name === 'reactiondsc'){
        setNewAllergy({...newAllergy, reactiondsc: `zz_${value}`})
      }
    };

    const submitAllergy = () => {
      const { typedsc, createdts, allergydsc, severitydsc, reactiondsc} = newAllergy;

      axios.post(`/api/newallergy`, {patientid: patient.patientid, createdts, typedsc, allergydsc, severitydsc, reactiondsc})

      .then(() => {
        if(lang === true){
          alert('new allergy added!')
  
        }
        else{
          alert('Nueva alergia agregada!')
        }
        window.location.reload(true)
      })
      .catch(err => console.log(err));
    }
    

    const columns = [
      {
        label: 'Date Added',
        name: 'createdts',
        options: {
          customBodyRender: (record, index) => {
            return record.substr(0, 10)
          }
        }
      },
      {
        label: 'Allergy Type',
        name: 'typedsc'
      },
      {
        label: 'Severity',
        name: 'severitydsc'
      },
      {
        label: 'Reactions',
        name: 'reactiondsc'
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
          noMatch: `${patient.firstnm} has no allergies on record.`
        }
      }
    }


    return (
      <div style={{height: '400px', width: '100%', overflow:'auto'}}>
      
      {lang === true
      ?
      <div>
        <h1 style={{textAlign: 'center'}}>
        Patient Overview
          </h1>
        <p>Birthdate: <b>{patient.birthdts.substr(0, 10)}</b></p>
        <p>Gender: <b>{patient.genderdsc}</b> </p>
        <p>Latest Encounter Date: <b>{get(encounters[encounters.length-1], 'encounterdts', 'n/a')}</b></p>
        <p>Recent Notes: <b>{get(encounters[encounters.length-1], 'commenttxt', 'n/a')}</b></p>

        <DataTable data={allergies} columns={columns} options={options} title={'Allergies'}  />
        {allergyEdit
        ?
        <Grid style={{marginTop: '25px', marginBottom: '25px'}} container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>New Allergy Form</h2>
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
            label="Allergy Type"
            onChange={(e) => handleInput(e)}
            name="typedsc"
            style={{marginBottom: '20px'}}
          />

<TextField
            variant="outlined"
            label="Allergy"
            onChange={(e) => handleInput(e)}
            name="allergydsc"
            style={{marginBottom: '20px'}}
          />
        </Grid>
        
        <Grid container direction='column' alignItems='center' xs={3}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Severity</FormLabel>
            <RadioGroup
              aria-label="Severity"
              // defaultValue="female"
              name="severitydsc"
              onChange={(e) => handleInput(e)}
              
            >
              <FormControlLabel
                value="mild"
                control={<Radio />}
                label="Mild"
              />
              <FormControlLabel value="moderate" control={<Radio />} label="Moderate" />
              <FormControlLabel value="severe" control={<Radio />} label="Severe" />
            </RadioGroup>
          </FormControl>
        
          <TextField
            variant="outlined"
            label="Reactions"
            onChange={(e) => handleInput(e)}
            name="reactiondsc"
            
          />
       </Grid>
       <Grid container justifyContent='center'>
        <Button style={{marginRight: '20px'}} onClick={handleToggle} children={'Cancel'} variant='contained'/>
        <Button onClick={submitAllergy} children={'Submit Allergy'} variant='contained' />
        </Grid>
        </Grid>
        </Grid>
        :
        <Button style={{marginTop: '20px', marginBottom: '25px'}} onClick={handleToggle} disabled={user.user.canedit === false} variant='contained'>Add/Edit</Button>
        }
        
        
        
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
        <h1 style={{textAlign: 'center'}}>
        Resumen del Paciente
          </h1>
        <p>Fecha de Nacimiento: <b>{patient.birthdts.substr(0, 10)}</b></p>
        <p>Género: <b>{patient.genderdsc}</b></p>
        <p>Fecha Del último Encuentro: <b>{encounters[encounters.length-1].encounterdts}</b></p>
        <p>Notas Recientes: <b>{encounters[encounters.length-1].commenttxt}</b></p>
        <h3>Alergias</h3>
        
        <>
       
        <DataTable data={allergies} columns={columns} options={options} title={'Allergies'}  />
          
        </>
        
        {allergies.length === 0 
        ? <p>Este paciente no tiene alergias registradas.</p>
        
        : null}
        
        {allergyEdit
        ?
        <Grid style={{marginTop: '25px', marginBottom: '25px'}} container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>Nueva Alergia</h2>
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
            label="
            Tipo de Alergia"
            onChange={(e) => handleInput(e)}
            name="typedsc"
            style={{marginBottom: '20px'}}
          />

<TextField
            variant="outlined"
            label="Alergia"
            onChange={(e) => handleInput(e)}
            name="allergydsc"
            style={{marginBottom: '20px'}}
          />
        </Grid>
        
        <Grid container direction='column' alignItems='center' xs={3}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Severity</FormLabel>
            <RadioGroup
              aria-label="
              Gravedad"
              // defaultValue="female"
              name="severitydsc"
              onChange={(e) => handleInput(e)}
              
            >
              <FormControlLabel
                value="mild"
                control={<Radio />}
                label="templado"
              />
              <FormControlLabel value="moderate" control={<Radio />} label="Moderado" />
              <FormControlLabel value="severe" control={<Radio />} label="Grave" />
            </RadioGroup>
          </FormControl>
        
          <TextField
            variant="outlined"
            label="Reacciones"
            onChange={(e) => handleInput(e)}
            name="reactiondsc"
            
          />
       </Grid>
       <Grid container justifyContent='center'>
        <Button style={{marginRight: '20px'}} onClick={handleToggle} children={'Cancelar'} variant='contained'/>
        <Button onClick={submitAllergy} children={'Enviar alergia'} variant='contained' />
        </Grid>
        </Grid>
        </Grid>
        :
        <Button style={{marginTop: '20px', marginBottom: '25px'}} onClick={handleToggle} disabled={user.user.canedit === false} variant='contained'>agregar / editar</Button>
        }
        
        
      </div>
      }
      </div>
    )
  }


export default PatientOverview;