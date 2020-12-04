import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const ActiveProblems = (props) => {
  const lang = useSelector(state => state.languageReducer.english)

  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>ACtive Problems
        <p>{props.patient.firstnm}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>Problemas Activos
        <p>{props.patient.firstnm}</p>
      </div>
      }
      </div>
    )
  }


export default ActiveProblems;