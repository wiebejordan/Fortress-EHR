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
          label: lang === true ? 'Encounter Date' : 'Fecha del Encuentro',
          name: 'encounterdts',
          options: {
            customBodyRender: (record, index) => {
              return record.substr(0, 10)
            }
          }
        },
        {
          label: lang === true ? 'Weight (lbs)' : 'Peso (lbs)',
          name: 'weight_lbs'
        },
        {
          label: lang === true ? 'Height (inch)' : 'Altura (inch)',
          name: 'height_inch'
        },
        {
          label: lang === true ? 'Systollic BP' : 'Presión Arterial Sistólica',
          name: 'systolic_bp'
        },
        {
          label: lang === true ? 'Diastolic BP' : 'Presión Arterial Diastólica',
          name: 'diastolic_bp'
        },
        {
          label: lang === true ? 'Heart Rate' : 'Ritmo Cardiaco',
          name: 'heart_rate'
        },
        {
          label: lang === true ? 'Respirations p/m' : 'Respiraciones Por Minuto',
          name: 'respirations_min'
        },
        {
          label: lang === true ? 'Encounter Notes' : 'Notas de Encuentro',
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
       <DataTable data={encounterArr} columns={columns} options={options} title={'Historial de Encuentros'}  />
      </div>
      }
      </div>
    )
  }


export default EncounterHistory;