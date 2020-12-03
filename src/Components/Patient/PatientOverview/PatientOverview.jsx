import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const PatientOverview = () => {
  const [item, setItem] = useState('overview'),
        lang = useSelector(state => state.languageReducer.english)

  const handleItemClick = (e, { name }) => setItem(name);

  

    return (
      <div>
      
      {lang === true
      ?
      <div>patient overview</div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>hola</div>
      }
      </div>
    )
  }


export default PatientOverview;