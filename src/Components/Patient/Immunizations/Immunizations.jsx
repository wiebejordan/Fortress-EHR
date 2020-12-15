import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const IMMUNIZATION = (props) => {
  const [item, setItem] = useState('overview'),

        {immunes} = props,
        lang = useSelector(state => state.languageReducer.english)
        console.log(immunes)


  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>IMMUNIZATION
        <p>{immunes[immunes.length-1].immunizationtypedsc}</p>
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