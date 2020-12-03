import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const PatientMenu = () => {
  const [item, setItem] = useState('overview'),
        lang = useSelector(state => state.languageReducer.english)

  const handleItemClick = (e, { name }) => setItem(name);

  

    return (
      <div>
      
      {lang === true
      ?
      <Menu  vertical>
        <Menu.Item
          name='overview'
          active={item === 'overview'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='patient history'
          active={item === 'patient history'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='active problems'
          active={item === 'active problems'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='medications'
          active={item === 'medications'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='immunizations'
          active={item === 'immunizations'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='visualization'
          active={item === 'visualization'}
          onClick={handleItemClick}
        />
      </Menu>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <Menu  vertical>
        <Menu.Item
          name='visión de conjunto'
          active={item === 'visión de conjunto'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='historial del paciente'
          active={item === 'historial del paciente'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='active problems'
          active={item === 'active problems'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='problemas activos'
          active={item === 'problemas activos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='inmunizaciones'
          active={item === 'inmunizaciones'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='visualizaciones'
          active={item === 'visualizaciones'}
          onClick={handleItemClick}
        />
      </Menu>
      }
      </div>
    )
  }


export default PatientMenu;