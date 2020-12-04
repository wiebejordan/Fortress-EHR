import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const Visualization = () => {
  const [item, setItem] = useState('overview'),
        lang = useSelector(state => state.languageReducer.english)

  

  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>VISUALIZATION</div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>hola</div>
      }
      </div>
    )
  }


export default Visualization;