import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux';
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
        // [dropdown, setDropdown] = useState('weight_lbs'),
        
        vis = useSelector(state => state.visReducer.vis),
        lang = useSelector(state => state.languageReducer.english),
        dispatch = useDispatch();
        console.log(vis)

        const handleDropdown = (e, {value}) => {
          // setDropdown(value);
          dispatch({
            type: 'CHANGE_VIS',
            payload: {
              vis: value
            }
          })

        }
  
        const chart = () => {
          let data = [];
          let date = [];
          
          for(let i = 0; i < props.encounters.length; i++){

            if(vis === 'weight_lbs'){
              data.push(parseInt(props.encounters[i].weight_lbs));
             }
             else if(vis === 'height_inch'){
              data.push(parseInt(props.encounters[i].height_inch));
             }
             else if(vis === 'diastolic_bp'){
              data.push(parseInt(props.encounters[i].diastolic_bp));
             }
             else if(vis === 'systolic_bp'){
              data.push(parseInt(props.encounters[i].systolic_bp));
             }
             else if(vis === 'heart_rate'){
              data.push(parseInt(props.encounters[i].heart_rate));
             }
             else if(vis === 'respirations_min'){
              data.push(parseInt(props.encounters[i].respirations_min));
             }
            date.push(parseInt(props.encounters[i].encounterdts));
          }

          setChartData({
            labels: date,
            datasets: [{
              label: vis,
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
      
    }, [vis])
  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>VISUALIZATION
        <Dropdown
        selection
        compact
        options={dropOptions}
        defaultValue={vis}
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