import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const IMMUNIZATION = (props) => {
  const [item, setItem] = useState('overview'),
        lang = useSelector(state => state.languageReducer.english)



  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>IMMUNIZATION
        <p>{props.patient.firstnm}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Inmunizaciones
        <p>{props.patient.firstnm}</p>
      </div>
      }
      </div>
    )
  }


export default IMMUNIZATION;