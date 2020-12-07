import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {Line} from 'react-chartjs-2'; 
import { parseInt } from 'lodash';

const dropOptions = [
  {
    key: 'Weight',
    text: 'Weight',
    value: 'weight_lbs'
  },
  {
    key: 'Height',
    text: 'Height',
    value: 'height_inch'
  },
  {
    key: 'Diastolic BP',
    text: 'Diastolic BP',
    value: 'diastolic_bp'
  },
  {
    key: 'Systolic BP',
    text: 'Systolic BP',
    value: 'systolic_bp'
  },
  {
    key: 'Heart Rate',
    text: 'Heart Rate',
    value: 'heart_rate'
  },
  {
    key: 'Respirations PM',
    text: 'Respirations PM',
    value: 'respirations_min'
  },
]

const Visualization = (props) => {
  const [chartData, setChartData] = useState({}),
        [dropdown, setDropdown] = useState('weight_lbs'),

        lang = useSelector(state => state.languageReducer.english);
        console.log(dropdown)

        const handleDropdown = (e, {value}) => {
          setDropdown(value)
        }
  
        const chart = () => {
          let data = [];
          let date = [];
          
          for(let i = 0; i < props.encounters.length; i++){

            if(dropdown === 'weight_lbs'){
              data.push(parseInt(props.encounters[i].weight_lbs));
             }
             else if(dropdown === 'height_inch'){
              data.push(parseInt(props.encounters[i].height_inch));
             }
             else if(dropdown === 'diastolic_bp'){
              data.push(parseInt(props.encounters[i].diastolic_bp));
             }
             else if(dropdown === 'systolic_bp'){
              data.push(parseInt(props.encounters[i].systolic_bp));
             }
             else if(dropdown === 'heart_rate'){
              data.push(parseInt(props.encounters[i].heart_rate));
             }
             else if(dropdown === 'respirations_min'){
              data.push(parseInt(props.encounters[i].respirations_min));
             }
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
      
    }, [dropdown])
  

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
        defaultValue='weight_lbs'
        onChange={handleDropdown}/>
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