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
            <tbody className='enc-tr' key={encounter.encounterid} value={encounter}>
            
            <tr className='enc-tr'>
            <td className='enc-td'>{encounter.encounterdts.substr(0, 10)}</td>
            <td className='enc-td'>{encounter.weight_lbs}</td>
            <td className='enc-td'>{encounter.height_inch}</td>
            <td className='enc-td'>{encounter.systolic_bp}</td>
            <td className='enc-td'>{encounter.diastolic_bp}</td>
            <td className='enc-td'>{encounter.heart_rate}</td>
            <td className='enc-td'>{encounter.respirations_min}</td>
            <td className='enc-td'>{encounter.commenttxt}</td>
            </tr>
            </tbody>
        )}
          </table>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>
          <table className='enc-table'>
            <thead className='enc-head'>
            <tr className='enc-tr'>
              <th className='enc-th'>Fecha del Encuentro</th>
              <th className='enc-th'>Peso (lbs)</th>
              <th className='enc-th'>Altura (inch)</th>
              <th className='enc-th'>Presión Arterial Sistólica</th>
              <th className='enc-th'>Presión Arterial Diastólica</th>
              <th className='enc-th'>Ritmo Cardiaco</th>
              <th className='enc-th'>Respiraciones Por Minuto</th>
              <th className='enc-th'>Notas de Encuentro</th>
            </tr>
            </thead>

        {encounterArr.map((encounter) => 
            <tbody className='enc-tr' key={encounter.encounterid} value={encounter}>
              
            <td className='enc-td'>{encounter.encounterdts.substr(0, 10)}</td>
            <td className='enc-td'>{encounter.weight_lbs}</td>
            <td className='enc-td'>{encounter.height_inch}</td>
            <td className='enc-td'>{encounter.systolic_bp}</td>
            <td className='enc-td'>{encounter.diastolic_bp}</td>
            <td className='enc-td'>{encounter.heart_rate}</td>
            <td className='enc-td'>{encounter.respirations_min}</td>
            <td className='enc-td'>{encounter.commenttxt}</td>

            </tbody>
        )}
          </table>
      </div>
      }
      </div>
    )
  }


export default EncounterHistory;