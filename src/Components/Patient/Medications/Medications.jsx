import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const Medications = (props) => {
  const lang = useSelector(state => state.languageReducer.english)

  

  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>Medications
        <p>{props.patient.firstnm}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Medicamentos
        <p>{props.patient.firstnm}</p>
      </div>
      }
      </div>
    )
  }


export default Medications;