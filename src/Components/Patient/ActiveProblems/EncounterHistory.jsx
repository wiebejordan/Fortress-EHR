import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const EncounterHistory = (props) => {
  const lang = useSelector(state => state.languageReducer.english)

  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>EncounterHistory
        <p>{props.patient.firstnm}</p>
      </div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>EncounterHistory
        <p>{props.patient.firstnm}</p>
      </div>
      }
      </div>
    )
  }


export default EncounterHistory;