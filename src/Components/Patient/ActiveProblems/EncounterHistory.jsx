import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import '../../../styles/style.scss';
import DataTable from '../../Global/data-table.component'

const EncounterHistory = (props) => {
  const [encounterArr, setEncounterArr] = useState([]),
      
      lang = useSelector(state => state.languageReducer.english),
      {encounters, patient} = props;
    console.log(encounterArr)

      useEffect(() => {
        setEncounterArr(encounters.reverse())
      }, [])

      const columns = [
        {
          label: 'Encounter Date',
          name: 'encounterdts',
          options: {
            customBodyRender: (record, index) => {
              return record.substr(0, 10)
            }
          }
        },
        {
          label: 'Weight (lbs)',
          name: 'weight_lbs'
        },
        {
          label: 'Height (inch)',
          name: 'height_inch'
        },
        {
          label: 'Systollic BP',
          name: 'systolic_bp'
        },
        {
          label: 'Diastolic BP',
          name: 'diastolic_bp'
        },
        {
          label: 'Heart Rate',
          name: 'heart_rate'
        },
        {
          label: 'Respirations p/m',
          name: 'respirations_min'
        },
        {
          label: 'Encounter Notes',
          name: 'commenttxt'
        },
      ]
  
    
      const options = {
        download: false,
        enableNestedDataAccess: '.',
        print: false,
        selectableRows: 'none',
        tableBodyHeight: 'auto',
        searchOpen: false,
        viewColumns: false,
      }

      if(encounterArr === []){
        return(
          <div>
            <p>This patient has not had any encounters.</p>
          </div>
        )
      }

    return (
      <div style={{height: '400px', width: 'auto', overflow:'auto', margin: '0'}}>
      
      {lang === true
      ?
    
          <DataTable data={encounterArr} columns={columns} options={options} title={'Encounter History'}  />
    
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