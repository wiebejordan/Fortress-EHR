import React, { useEffect, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {Line} from 'react-chartjs-2'; 

const Visualization = (props) => {
  const [chartData, setChartData] = useState({}),
        lang = useSelector(state => state.languageReducer.english);

  
        const chart = () => {
          setChartData({
            labels: ['Jan', "Feb", 'Mar', 'Apr', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Weight',
              data: [100, 120, 125, 130, 145, 150, 145, 155, 160, 165, 163, 150],
              backgroundColor: [
                'rgba(75, 192, 192, 0.6'
              ],
              borderWidth: 4
            }]
          })
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