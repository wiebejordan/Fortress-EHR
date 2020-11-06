import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';


const mapStateToProps = (reduxState) => reduxState;

 const Patient = (props) => {
   const [patientID, setPatientID] = useState(null),
         [patient, setPatient] = useState({id: null, name: '', age: '', dob: '', height: '', weight: '', allergies: '', patientHistory: '', activeProblems: '', medications: ''});

  useEffect(() => {
    const {id, name, age, dob, height, weight, allergies, patientHistory, activeProblems, medications} = props.patientReducer.patients[props.match.params.patientid -1]
    console.log(props)
    if(props.match.params.patientid){
      setPatient({id, name, age, dob, height, weight, allergies, patientHistory, activeProblems, medications })
    }
  }, [])
  return(<div>
    <p><b>Id:</b> {patient.id}</p>
    <p><b>Name:</b> {patient.name}</p> 
    <p><b>Age:</b> {patient.age}</p>
    <p><b>Date of Birth:</b> {patient.dob}</p>
    <p><b>Height:</b> {patient.height}</p>
    <p><b>Weight:</b> {patient.weight}</p>
    <p><b>Allergies:</b> {patient.allergies}</p>
    <p><b>Patient History:</b> {patient.patientHistory}</p>
    <p><b>Active Problems:</b> {patient.activeProblems}</p>
    <p><b>Medications:</b> {patient.medications}</p>
  </div>
  )
}

export default connect(mapStateToProps)(Patient);