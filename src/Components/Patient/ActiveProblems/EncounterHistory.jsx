import React, { useState, useEffect } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import '../../../styles/style.scss';

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
      <div>
          <table className='enc-table'>
            <thead className='enc-head'>
            <tr className='enc-tr'>
              <th className='enc-th'>Encounter Date</th>
              <th className='enc-th'>Weight (lbs)</th>
              <th className='enc-th'>Height (inch)</th>
              <th className='enc-th'>Systolic BP</th>
              <th className='enc-th'>Diastolic BP</th>
              <th className='enc-th'>Heart Rate</th>
              <th className='enc-th'>Respirations p/m</th>
              <th className='enc-th'>Encounter Notes</th>
            </tr>
            </thead>

        {encounterArr.map((encounter) => 
            <tr className='enc-tr' key={encounter.encounterid} value={encounter}>
              
            <td className='enc-td'>{encounter.encounterdts.substr(0, 10)}</td>
            <td className='enc-td'>{encounter.weight_lbs}</td>
            <td className='enc-td'>{encounter.height_inch}</td>
            <td className='enc-td'>{encounter.systolic_bp}</td>
            <td className='enc-td'>{encounter.diastolic_bp}</td>
            <td className='enc-td'>{encounter.heart_rate}</td>
            <td className='enc-td'>{encounter.respirations_min}</td>
            <td className='enc-td'>{encounter.commenttxt}</td>

            </tr>
        )}
          </table>
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