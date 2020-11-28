import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';


const NewPatient = () => {
  const [patient, setPatient] = useState({firstnm: '', lastnm: '', birthdts: '', genderdsc: '', hispanicflg: '',          ethnicitydsc: '', race01dsc: '', race02dsc: '', race03dsc: ''}),

        lang = useSelector(state => state.languageReducer.english),
        user = useSelector(state => state.authReducer);
    console.log(patient)

  const handleInput = (e, result) => {
    const {name, value} = result || e.target;
    setPatient({...patient, [name]: value});
  };

  return(
    <div>
      {lang === true 
      ?
      <form>
        <input placeholder='First Name' onChange={(e) => handleInput(e)}  name='firstnm'></input>
        <input placeholder='Last Name' onChange={(e) => handleInput(e)} name='lastnm'></input>
        <input placeholder='Birthdate' onChange={(e) => handleInput(e)} name='birthdts'></input>
        <input placeholder='gender' onChange={(e) => handleInput(e)} name='genderdsc'></input>
        <input placeholder='hispanic?' onChange={(e) => handleInput(e)} name='hispanicflg'></input>
        <input placeholder='ethnicity' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <input placeholder='race' onChange={(e) => handleInput(e)} name='race01dsc'></input>
        <input placeholder='race' onChange={(e) => handleInput(e)} name='race02dsc'></input>
        <input placeholder='race' onChange={(e) => handleInput(e)} name='race03dsc'></input>
        
        
      </form>
      :
      <form>
        <input placeholder='primer nombre' onChange={(e) => handleInput(e)}  name='firstnm'></input>
        <input placeholder='apellido' onChange={(e) => handleInput(e)} name='lastnm'></input>
        <input placeholder='fecha de nacimiento' onChange={(e) => handleInput(e)} name='birthdts'></input>
        <input placeholder='género' onChange={(e) => handleInput(e)} name='genderdsc'></input>
        <input placeholder='¿hispano?' onChange={(e) => handleInput(e)} name='hispanicflg'></input>
        <input placeholder='etnia' onChange={(e) => handleInput(e)} name='ethnicitydsc'></input>
        <input placeholder='raza' onChange={(e) => handleInput(e)} name='race01dsc'></input>
        <input placeholder='raza' onChange={(e) => handleInput(e)} name='race02dsc'></input>
        <input placeholder='raza' onChange={(e) => handleInput(e)} name='race03dsc'></input>
        
    
      </form>
    }
    </div>
  )
}

export default NewPatient;