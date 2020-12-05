import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {Line} from 'react-chartjs-2'; 
import { parseInt } from 'lodash';

const dropOptions = [
  {
    key: 'Weight',
    text: 'Weight',
    value: 'Weight'
  },
  {
    key: 'Height',
    text: 'Height',
    value: 'Height'
  },
  {
    key: 'Diastolic BP',
    text: 'Diastolic BP',
    value: 'Diastolic BP'
  },
  {
    key: 'Systolic BP',
    text: 'Systolic BP',
    value: 'Systolic BP'
  },
  {
    key: 'Heart Rate',
    text: 'Heart Rate',
    value: 'Heart Rate'
  },
  {
    key: 'Respirations PM',
    text: 'Respirations PM',
    value: 'Respirations PM'
  },
]

const Visualization = (props) => {
  const [chartData, setChartData] = useState({}),
        [dropdown, setDropdown] = useState(''),

        lang = useSelector(state => state.languageReducer.english);
        console.log(dropdown)

        const handleDropdown = (e) => {
          setDropdown(e.target.value)
        }
  
        const chart = () => {
          let data = [];
          let date = [];
          
          for(let i = 0; i < props.encounters.length; i++){

            data.push(parseInt(props.encounters[i].weight_lbs));
            date.push(parseInt(props.encounters[i].encounterdts));
          }

          setChartData({
            labels: date,
            datasets: [{
              label: 'Weight (lbs)',
              data: data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6'
              ],
              borderWidth: 4
            }]
          })
          console.log('data', date, data)
        }

    useEffect(() => {
      chart()
      
    }, [])
  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>VISUALIZATION
        <Dropdown
        selection
        compact
        options={dropOptions}
        value={dropdown}
        onChange={(e) => handleDropdown(e.target.value)}/>
        <Line data={chartData}/>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Visualizaciones
        <p>{props.patient.firstnm}</p>
        <Line data={chartData}/>
      </div>
      }
      </div>
    )
  }


export default Visualization;