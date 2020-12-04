import React, { useEffect, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {Line} from 'react-chartjs-2'; 
import { parseInt } from 'lodash';

const Visualization = (props) => {
  const [chartData, setChartData] = useState({}),
        [employeeSalary, setEmployeeSalary] = useState({}),

        lang = useSelector(state => state.languageReducer.english);
        console.log(props.encounters)
  
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
              label: 'Weight',
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
        <p>{props.patient.firstnm}</p>
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