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
    <div >
      {lang === true ? (
        <Grid  container direction='column' justifyContent='space-around' alignItems='center'>
          <h2>New Patient</h2>
          <Grid style={{marginBottom: '25px'}} container  xs={5} justifyContent='space-around' alignItems='center'>
          <TextField
            variant="outlined"
            label="First Name"
            onChange={(e) => handleInput(e)}
            name="firstnm"
          ></TextField>

          <TextField
            variant="outlined"
            label="Last Name"
            onChange={(e) => handleInput(e)}
            name="lastnm"
          ></TextField>

          <TextField
            variant="outlined"
            type="date"
            label="Birthdate"
            onChange={(e) => handleInput(e)}
            name="birthdts"
            InputLabelProps={{ shrink: true }}
          ></TextField>
          </Grid>
          <Grid container style={{marginBottom: '25px'}} xs={5} justifyContent='space-around' >
          <FormControl component="fieldset">
            <FormLabel component="legend">Sex</FormLabel>
            <RadioGroup
              aria-label="Sex"
              defaultValue="female"
              name="genderdsc"
              onChange={(e) => handleInput(e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Hispanic</FormLabel>
            <RadioGroup
              aria-label="Hispanic"
              defaultValue="no"
              name="hispanicflg"
              onChange={(e) => handleInput(e)}
            >
              <FormControlLabel value="N" control={<Radio />} label="No" />
              <FormControlLabel value="Y" control={<Radio />} label="Yes" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Ethnicity</FormLabel>
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
            label="Patient History"
            onChange={(e) => handleInput(e)}
            name="history"
            style={{width: '575px'}}
          ></TextField>

          <Button style={{margin:'15px'}} variant='contained' onClick={handleSubmit}>Submit New Patient</Button>
        </Grid>
      ) : (
        <div className="newpatient-form-container">
          <p>Primer nombre:</p>
          <TextField
            placeholder="First Name"
            onChange={(e) => handleInput(e)}
            name="firstnm"
          ></TextField>
          <p>Apellido:</p>
          <TextField
            placeholder="Last Name"
            onChange={(e) => handleInput(e)}
            name="lastnm"
          ></TextField>
          <p>Fecha de nacimiento:</p>
          <TextField
            type="date"
            placeholder="Birthdate"
            onChange={(e) => handleInput(e)}
            name="birthdts"
          ></TextField>
          <p>Sexo:</p>
          <TextField
            type="radio"
            value="Male"
            placeholder="gender"
            onChange={(e) => handleInput(e)}
            name="genderdsc"
          ></TextField>
          <label> Masculino</label>
          <br />
          <TextField
            type="radio"
            value="Female"
            placeholder="gender"
            onChange={(e) => handleInput(e)}
            name="genderdsc"
          ></TextField>
          <label> Hembra</label>
          <br />
          <p>Hispano:</p>
          <TextField
            type="radio"
            value="Y"
            onChange={(e) => handleInput(e)}
            name="hispanicflg"
          ></TextField>
          <label> Si</label>
          <br />
          <TextField
            type="radio"
            value="N"
            onChange={(e) => handleInput(e)}
            name="hispanicflg"
          ></TextField>
          <label> No</label>
          <br />
          <p>Etnia:</p>
          <TextField
            type="radio"
            value="American Indian/Alaska Native"
            onChange={(e) => handleInput(e)}
            name="ethnicitydsc"
          ></TextField>
          <label> Indio Americano</label>
          <br />
          <TextField
            type="radio"
            value="Asian"
            onChange={(e) => handleInput(e)}
            name="ethnicitydsc"
          ></TextField>
          <label> Asiático</label>
          <br />
          <TextField
            type="radio"
            value="Black or African American"
            onChange={(e) => handleInput(e)}
            name="ethnicitydsc"
          ></TextField>
          <label> Afroamericano</label>
          <br />
          <TextField
            type="radio"
            value="Hispanic or Latino"
            onChange={(e) => handleInput(e)}
            name="ethnicitydsc"
          ></TextField>
          <label> Hispano or Latino</label>
          <br />
          <TextField
            type="radio"
            value="Native Hawaiian or Other Pacific Islander"
            onChange={(e) => handleInput(e)}
            name="ethnicitydsc"
          ></TextField>
          <label> Hawaiano Nativo u Otro Isleño del Pacífico</label>
          <br />
          <TextField
            type="radio"
            value="White"
            onChange={(e) => handleInput(e)}
            name="ethnicitydsc"
          ></TextField>
          <label> Blanco</label>
          <br />
          {/* <TextField placeholder='raza' onChange={(e) => handleInput(e)} name='race01dsc'></TextField>
        <TextField placeholder='raza' onChange={(e) => handleInput(e)} name='race02dsc'></TextField>
        <TextField placeholder='raza' onChange={(e) => handleInput(e)} name='race03dsc'></TextField> */}

          <p>Historial del paciente</p>
          <br />
          <textarea
            style={{
              resize: "none",
              width: "100%",
              height: "200px",
              overflow: "auto",
            }}
            onChange={(e) => handleInput(e)}
            name="history"
          />
          <button onClick={handleSubmit}>Enviar Nuevo Paciente</button>
        </div>
      )}
    </div>
  );
};

export default NewPatient;
