import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


const mapStateToProps = (reduxState) => reduxState;

 const Patient = (props) => {
   const [patientID, setPatientID] = useState(null),
         [firstnm, setFirstNm] = useState(''),
         [lastnm, setLastNm] = useState(''),
         [birthdts, setBirthdts] = useState(''),
         [genderdsc, setGenderdsc] = useState(''),
          [hispanicflg, setHispanicflg] = useState(''),
          [ethnicitydsc, setEthnicitydsc] = useState(''),
          [race01dsc, setRace01dsc] = useState(''),
          [race02dsc, setRace02dsc] = useState(''),
          [activeflg, setActiveflg] = useState(''),
         user = useSelector(state => state.authReducer),
         history = useHistory();

  useEffect(() => {
    
    if(props.match.params.patientid){
      axios.get(`/api/patient/${props.match.params.patientid}`)
      .then(res => {
        setPatientID(res.data[0].patientid);
        setFirstNm(res.data[0].firstnm);
        setLastNm(res.data[0].lastnm);
        setBirthdts(res.data[0].birthdts);
        setGenderdsc(res.data[0].genderdsc);
        setHispanicflg(res.data[0].hispanicflg);
        setEthnicitydsc(res.data[0].ethnicitydsc);
        setRace01dsc(res.data[0].race01dsc);
        setRace02dsc(res.data[0].race02dsc);
        setActiveflg(res.data[0].activeflg);
      })
    }
  }, [])

  useEffect(() => {
    if(!user.user.username){
      history.push('/')}
  })
  return(<div>
    {props.languageReducer.english === true 
    ?(
    <>
    <p><b>Id:</b> {patientID}</p>
    <p><b>Name:</b> {lastnm}, {firstnm}</p> 
    <p><b>Date of Birth:</b> {birthdts}</p>
    <p><b>Gender:</b> {genderdsc}</p>
    {/* <p><b>Height:</b> {patient.height}</p>
    <p><b>Weight:</b> {patient.weight}</p> */}
    {/* <p><b>Allergies:</b> {patient.allergies}</p>
    <p><b>Patient History:</b> {patient.patientHistory}</p>
    <p><b>Active Problems:</b> {patient.activeProblems}</p>
    <p><b>Medications:</b> {patient.medications}</p> */}
    </>
    )
    : 
    <>
    <p><b>Id:</b> {patientID}</p>
    <p><b>Nombre:</b> {lastnm}, {firstnm}</p> 
    <p><b>Fecha de Nacimiento:</b> {birthdts}</p>
    <p><b>Género:</b> {genderdsc}</p>
    {/* <p><b>Altura:</b> {patient.height}</p>
    <p><b>Peso:</b> {patient.weight}</p>
    <p><b>Alergias:</b> {patient.allergies}</p>
    <p><b>Historial del Paciente:</b> {patient.patientHistory}</p>
    <p><b>Problemas Activos:</b> {patient.activeProblems}</p>
    <p><b>Medicamentos:</b> {patient.medications}</p> */}
    </>}
  </div>
  )
}

export default connect(mapStateToProps)(Patient);