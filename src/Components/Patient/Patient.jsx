import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';


const mapStateToProps = (reduxState) => reduxState;

 const Patient = (props) => {
   const [patientID, setPatientID] = useState(null),
         [patient, setPatient] = useState({id: null, name: '', age: '', dob: '', gender: '', height: '', weight: '', allergies: '', patientHistory: '', activeProblems: '', medications: ''});

  useEffect(() => {
    const {id, name, age, dob, gender, height, weight, allergies, patientHistory, activeProblems, medications} = props.patientReducer.patients[props.match.params.patientid -1]
    console.log(props)
    if(props.match.params.patientid){
      setPatient({id, name, age, dob, gender, height, weight, allergies, patientHistory, activeProblems, medications })
    }
  }, [])
  return(<div>
    {props.languageReducer.english === true 
    ?(
    <>
    <p><b>Id:</b> {patient.id}</p>
    <p><b>Name:</b> {patient.name}</p> 
    <p><b>Age:</b> {patient.age}</p>
    <p><b>Date of Birth:</b> {patient.dob}</p>
    <p><b>Gender:</b> {patient.gender}</p>
    <p><b>Height:</b> {patient.height}</p>
    <p><b>Weight:</b> {patient.weight}</p>
    <p><b>Allergies:</b> {patient.allergies}</p>
    <p><b>Patient History:</b> {patient.patientHistory}</p>
    <p><b>Active Problems:</b> {patient.activeProblems}</p>
    <p><b>Medications:</b> {patient.medications}</p>
    </>
    )
    : 
    <>
    <p><b>Id:</b> {patient.id}</p>
    <p><b>Nombre:</b> {patient.name}</p> 
    <p><b>Años:</b> {patient.age}</p>
    <p><b>Fecha de Nacimiento:</b> {patient.dob}</p>
    <p><b>Género:</b> {patient.gender}</p>
    <p><b>Altura:</b> {patient.height}</p>
    <p><b>Peso:</b> {patient.weight}</p>
    <p><b>Alergias:</b> {patient.allergies}</p>
    <p><b>Historial del Paciente:</b> {patient.patientHistory}</p>
    <p><b>Problemas Activos:</b> {patient.activeProblems}</p>
    <p><b>Medicamentos:</b> {patient.medications}</p>
    </>}
  </div>
  )
}

export default connect(mapStateToProps)(Patient);