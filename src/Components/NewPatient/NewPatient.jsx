import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import '../../styles/style.scss'

const NewPatient = () => {
  const [patient, setPatient] = useState({firstnm: '', lastnm: '', birthdts: '', genderdsc: '', hispanicflg: '',          ethnicitydsc: '', race01dsc: '', race02dsc: '', race03dsc: '', activeflg: 'Y', history: ''}),

        lang = useSelector(state => state.languageReducer.english),
        user = useSelector(state => state.authReducer),
        history = useHistory();
    console.log(patient)

  const handleInput = (e, result) => {
    const {name, value} = result || e.target;
    setPatient({...patient, [name]: value});
  };

  const handleSubmit = () => {
    const {activeflg, birthdts, ethnicitydsc, firstnm, genderdsc, hispanicflg, lastnm, race01dsc, race02dsc, race03dsc, history} = patient;
    axios.post('/api/newpatient', {activeflg, birthdts, ethnicitydsc, firstnm, genderdsc, hispanicflg, lastnm,  race01dsc, race02dsc, race03dsc, history})

    .then(() => {
      history.push('/main')
      if(lang === true){
        alert('new patient added!')

      }
      else{
        alert('Nueva paciente agregada!')
      }
    })
    .catch(err => console.log(err));
  }

  return(
    <div className='newpatient-container'>
      {lang === true 
      ?
      <div className='newpatient-form-container'>
        <p>First name:</p>
        <input placeholder='First Name' onChange={(e) => handleInput(e)}  name='firstnm'></input>
        <p>Last name:</p>
        <input placeholder='Last Name' onChange={(e) => handleInput(e)} name='lastnm'></input>
        <p>Date of birth:</p>
        <input type='date' placeholder='Birthdate' onChange={(e) => handleInput(e)} name='birthdts'></input>
        <p>Sex:</p>
        <input type='radio' value='Male' placeholder='gender' onChange={(e) => handleInput(e)} name='genderdsc'></input>
        <label> Male</label><br/>
        <input type='radio' value='Female' placeholder='gender' onChange={(e) => handleInput(e)} name='genderdsc'></input>
        <label> Female</label><br/>
        <p>Hispanic:</p>
        <input type='radio' value='Y'  onChange={(e) => handleInput(e)} name='hispanicflg'></input>
        <label> Yes</label><br/>
        <input type='radio' value='N'  onChange={(e) => handleInput(e)} name='hispanicflg'></input>
        <label> No</label><br/>
        <p>Ethnicity:</p>
        <input type='radio' value='American Indian/Alaska Native' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <label> American Indian/Alaska Native</label><br/>
        <input type='radio' value='Asian' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <label> Asian</label><br/>
        <input type='radio' value='Black or African American' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <label> Black or African American</label><br/>
        <input type='radio' value='Hispanic or Latino' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <label> Hispanic or Latino</label><br/>
        <input type='radio' value='Native Hawaiian or Other Pacific Islander' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <label> Native Hawaiian or Other Pacific Islander</label><br/>
        <input type='radio' value='White' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <label> White</label><br/>

        {/* <input placeholder='race' onChange={(e) => handleInput(e)} name='race01dsc'></input>
        <input placeholder='race' onChange={(e) => handleInput(e)} name='race02dsc'></input>
        <input placeholder='race' onChange={(e) => handleInput(e)} name='race03dsc'></input> */}

        <p>Patient History</p><br/>
        <textarea style={{resize: 'none', width: '100%', height: '200px', overflow: 'auto'}} onChange={(e) => handleInput(e)} name='history'/>

        
        
        <button  onClick={handleSubmit}>Submit New Patient</button>
        
      </div>
      :
      <div>
        <p>Primer nombre:</p>
        <input placeholder='First Name' onChange={(e) => handleInput(e)}  name='firstnm' ></input>
        <p>Apellido:</p>
        <input placeholder='Last Name' onChange={(e) => handleInput(e)} name='lastnm' ></input>
        <p>Fecha de nacimiento:</p>
        <input type='date' placeholder='Birthdate' onChange={(e) => handleInput(e)} name='birthdts' ></input>
        <p>Sexo:</p>
        <input type='radio' value='Male' placeholder='gender' onChange={(e) => handleInput(e)} name='genderdsc' ></input>
        <label> Masculino</label><br/>
        <input type='radio' value='Female' placeholder='gender' onChange={(e) => handleInput(e)} name='genderdsc' ></input>
        <label> Hembra</label><br/>
        <p>Hispano:</p>
        <input type='radio' value='Y'  onChange={(e) => handleInput(e)} name='hispanicflg' ></input>
        <label> Si</label><br/>
        <input type='radio' value='N'  onChange={(e) => handleInput(e)} name='hispanicflg' ></input>
        <label> No</label><br/>
        <p>Etnia:</p>
        <input type='radio' value='American Indian/Alaska Native' onChange={(e) => handleInput(e)} name='ethnicitydsc' ></input>
        <label> Indio Americano</label><br/>
        <input type='radio' value='Asian' onChange={(e) => handleInput(e)} name='ethnicitydsc' ></input>
        <label> Asiático</label><br/>
        <input type='radio' value='Black or African American' onChange={(e) => handleInput(e)} name='ethnicitydsc' ></input>
        <label> Afroamericano</label><br/>
        <input type='radio' value='Hispanic or Latino' onChange={(e) => handleInput(e)} name='ethnicitydsc' ></input>
        <label> Hispano or Latino</label><br/>
        <input type='radio' value='Native Hawaiian or Other Pacific Islander' onChange={(e) => handleInput(e)} name='ethnicitydsc' ></input>
        <label> Hawaiano Nativo u Otro Isleño del Pacífico</label><br/>
        <input type='radio' value='White' onChange={(e) => handleInput(e)} name='ethnicitydsc' ></input>
        <label> Blanco</label><br/>
        {/* <input placeholder='raza' onChange={(e) => handleInput(e)} name='race01dsc'></input>
        <input placeholder='raza' onChange={(e) => handleInput(e)} name='race02dsc'></input>
        <input placeholder='raza' onChange={(e) => handleInput(e)} name='race03dsc'></input> */}

        <p>Historial del paciente</p><br/>
        <textarea style={{resize: 'none', width: '100%', height: '200px', overflow: 'auto'}} onChange={(e) => handleInput(e)} name='history'/>
        <button  onClick={handleSubmit}>Enviar Nuevo Paciente</button>
    
      </div>
    }
    </div>
  )
}

export default NewPatient;