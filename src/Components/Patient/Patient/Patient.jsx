import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Loader, Menu} from 'semantic-ui-react';
import PatientMenu from '../PatientMenu/PatientMenu'





 const Patient = () => {
  const [item, setItem] = useState('overview'),
  lang = useSelector(state => state.languageReducer.english)

  const handleItemClick = (e, { name }) => setItem(name);

  console.log(item)
  
  
  return(
    <div>
      
      {lang === true
      ?
      <Menu  vertical>
        <Menu.Item
          name='overview'
          active={item === 'overview' || item === 'visión de conjunto'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='patient history'
          active={item === 'patient history' || item === 'historial del paciente'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='active problems'
          active={item === 'active problems' || item === 'problemas activos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='medications'
          active={item === 'medications' || item === 'medicamentos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='immunizations'
          active={item === 'immunizations' || item === 'inmunizaciones'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='visualization'
          active={item === 'visualization' || item === 'visualizaciones'}
          onClick={handleItemClick}
        />
      </Menu>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <Menu  vertical>
        <Menu.Item
          name='visión de conjunto'
          active={item === 'overview' || item === 'visión de conjunto'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='historial del paciente'
          active={item === 'patient history' || item === 'historial del paciente'}
          onClick={handleItemClick}
        />
          <Menu.Item
            name='problemas activos'
            active={item === 'active problems' || item === 'problemas activos'}
            onClick={handleItemClick}
          />
        <Menu.Item
          name='medicamentos'
          active={item === 'medications' || item === 'medicamentos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='inmunizaciones'
          active={item === 'immunizations' || item === 'inmunizaciones'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='visualizaciones'
          active={item === 'visualization' || item === 'visualizaciones'}
          onClick={handleItemClick}
        />
      </Menu>
      }
      </div>
  )
}

export default Patient