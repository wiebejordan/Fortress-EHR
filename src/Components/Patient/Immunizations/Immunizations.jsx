import React, { useEffect, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const IMMUNIZATION = (props) => {
  const [item, setItem] = useState('overview'),
        [immunes, setImmunes] = useState([]),
        
        lang = useSelector(state => state.languageReducer.english)
        console.log(immunes)


    useEffect(() => {
      setImmunes(props.immunes)
    }, [])



    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>IMMUNIZATION
        {immunes.map((immune) => 
          <div key={immune.immunizationid} value={immune}>
            <p>{immune.createdts}</p>
            <p>{immune.immunizationtypedsc}</p>
            <p>{immune.routedsc}</p>
          </div>
          
        )}
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