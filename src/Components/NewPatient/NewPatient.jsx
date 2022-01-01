import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../../styles/style.scss";
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

const NewPatient = () => {
  const [patient, setPatient] = useState({
      firstnm: "",
      lastnm: "",
      birthdts: "",
      genderdsc: "",
      hispanicflg: "",
      ethnicitydsc: "",
      race01dsc: "",
      race02dsc: "",
      race03dsc: "",
      activeflg: "Y",
      history: "",
    }),
    lang = useSelector((state) => state.languageReducer.english),
    user = useSelector((state) => state.authReducer),
    browseHistory = useHistory();
  console.log(patient);

  const handleInput = (e, result) => {
    const { name, value } = result || e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = () => {
    const {
      activeflg,
      birthdts,
      ethnicitydsc,
      firstnm,
      genderdsc,
      hispanicflg,
      lastnm,
      race01dsc,
      race02dsc,
      race03dsc,
      history,
    } = patient;
    axios
      .post("/api/newpatient", {
        activeflg,
        birthdts,
        ethnicitydsc,
        firstnm,
        genderdsc,
        hispanicflg,
        lastnm,
        race01dsc,
        race02dsc,
        race03dsc,
        history,
      })

      
        browseHistory.push("/main");
        if (lang === true) {
          alert("new patient added!");
        } else {
          alert("Nueva paciente agregada!");
        }
      
    
  };

  return (
    <div style={{marginBottom: '50px'}}>
     
        <Grid  container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>{lang === true ? 'New Patient' : 'Nuevo Paciente' }</h2>
          <Grid style={{marginBottom: '25px'}} container  xs={6} justifyContent='space-around' alignItems='center'>
          <TextField
            variant="outlined"
            label={lang === true ? "First Name" : 'Primer nombre'}
            onChange={(e) => handleInput(e)}
            name="firstnm"
          ></TextField>

          <TextField
            variant="outlined"
            label={lang === true ? "Last Name" : 'Apellido'}
            onChange={(e) => handleInput(e)}
            name="lastnm"
          ></TextField>

          <TextField
            variant="outlined"
            type="date"
            label={lang === true ? "Last Name" : "fecha de nacimiento"}
            onChange={(e) => handleInput(e)}
            name="birthdts"
            InputLabelProps={{ shrink: true }}
          ></TextField>
          </Grid>
          <Grid container style={{marginBottom: '25px'}} xs={5} justifyContent='space-around' >
          <FormControl component="fieldset">
            <FormLabel component="legend">{lang === true ? "Sex" : "Sexo"}</FormLabel>
            <RadioGroup
              aria-label="Sex"
              defaultValue="female"
              name="genderdsc"
              onChange={(e) => handleInput(e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={lang === true ? "Female" : "Mujer"}
              />
              <FormControlLabel value="male" control={<Radio />} label={lang === true ? "Male" : "Masculino"} />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">{lang === true ? "Hispanic" : "Hispano"}</FormLabel>
            <RadioGroup
              aria-label="Hispanic"
              defaultValue="no"
              name="hispanicflg"
              onChange={(e) => handleInput(e)}
            >
              <FormControlLabel value="N" control={<Radio />} label="No" />
              <FormControlLabel value="Y" control={<Radio />} label={lang === true ? "Yes" : "Si"} />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">{lang === true ? "Ethnicity" : "Etnicidad"}</FormLabel>
            <RadioGroup
              aria-label="Ethnicity"
              name="ethnicitydsc"
              onChange={(e) => handleInput(e)}
            >
              <FormControlLabel
                value="American Indian/Alaska Native"
                control={<Radio />}
                label="American Indian/Alaska Native"
              />
              <FormControlLabel
                value="Asian"
                control={<Radio />}
                label="Asian"
              />
              <FormControlLabel
                value="Black or African American"
                control={<Radio />}
                label="Black or African American"
              />
              <FormControlLabel
                value="Hispanic or Latino"
                control={<Radio />}
                label="Hispanic or Latino"
              />
              <FormControlLabel
                value="Native Hawaiian or Other Pacific Islander"
                control={<Radio />}
                label="Native Hawaiian or Other Pacific Islander"
              />
              <FormControlLabel
                value="White"
                control={<Radio />}
                label="White"
              />
            </RadioGroup>
          </FormControl>
          </Grid>
      
          {/* <TextField placeholder='race' onChange={(e) => handleInput(e)} name='race01dsc'></TextField>
        <TextField placeholder='race' onChange={(e) => handleInput(e)} name='race02dsc'></TextField>
        <TextField placeholder='race' onChange={(e) => handleInput(e)} name='race03dsc'></TextField> */}

          <TextField
            minRows="3"
            multiline
            variant="outlined"
            label={lang === true ? 'Patient History' : 'Historial del Paciente'}
            onChange={(e) => handleInput(e)}
            name="history"
            style={{width: '575px'}}
          ></TextField>

          <Button style={{margin:'15px'}} variant='contained' onClick={handleSubmit}>{lang === true ? 'Submit New Patient' : 'Enviar Nuevo Paciente'}</Button>
        </Grid>
     
    </div>
  );
};

export default NewPatient;
