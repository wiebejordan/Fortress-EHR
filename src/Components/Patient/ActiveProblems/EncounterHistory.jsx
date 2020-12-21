import React, { useState, useEffect } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const EncounterHistory = (props) => {
  const [encounterArr, setEncounterArr] = useState([]),
      
      lang = useSelector(state => state.languageReducer.english),
      {encounters, patient} = props;
  

      useEffect(() => {
        setEncounterArr(encounters)
      }, [])

      if(encounterArr === []){
        return(
          <div>
            <p>This patient has not had any encounters.</p>
          </div>
        )
      }

    return (
      <div style={{height: '400px', width: '600px', overflow:'auto'}}>
      
      {lang === true
      ?
      <div>EncounterHistory
        {encounterArr.map((encounter) => 
          <div key={encounter.encounterid} value={encounter}>
            <p>Encounter date: {encounter.encounterdts.substr(0, 10)}</p>
            <p>Weight(lbs): {encounter.weight_lbs}</p>
            <p>Height(inch): {encounter.height_inch}</p>
            <p>Systolic BP: {encounter.systolic_bp}</p>
            <p>Diastolic BP: {encounter.diastolic_bp}</p>
            <p>Heart Rate: {encounter.heart_rate}</p>
            <p>Respirations per Minute: {encounter.respirations_min}</p>
            <p>Notes: {encounter.commenttxt}</p>
          </div>
        )}
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Historia De Encuentros
        {encounterArr.map((encounter) => 
          <div key={encounter.encounterid} value={encounter}>
            <p>Fecha de Encuentro: {encounter.encounterdts}</p>
            <p>Peso(lbs): {encounter.weight_lbs}</p>
            <p>Altura(inch): {encounter.height_inch}</p>
            <p>Presión Arterial Sistólica: {encounter.systolic_bp}</p>
            <p>Presión Arterial Diastólica: {encounter.diastolic_bp}</p>
            <p>Ritmo Cardiaco: {encounter.heart_rate}</p>
            <p>Respiraciones Por Minuto: {encounter.respirations_min}</p>
            <p>Notas: {encounter.commenttxt}</p>
          </div>
        )}
      </div>
      }
      </div>
    )
  }


export default EncounterHistory;