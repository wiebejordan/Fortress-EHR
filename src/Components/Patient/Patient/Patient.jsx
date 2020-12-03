import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Loader, Menu, Segment, Grid, Container} from 'semantic-ui-react';
import PatientOverview from '../PatientOverview/PatientOverview'





 const Patient = (props) => {
  const [item, setItem] = useState('overview'),
        [patient, setPatient] = useState({}),
  user = useSelector(state => state.authReducer),
  lang = useSelector(state => state.languageReducer.english);
  // console.log(patient)

  useEffect(() => {
    if(props.match.params.patientid){
      axios.get(`/api/patient/${props.match.params.patientid}`)

      .then(res => {
        setPatient(res.data)
      })
    }
  }, [])

  const handleItemClick = (e, { name }) => setItem(name);

  
  
  
  return(
    <div>
      
      <div className='patient-grid-container'>
      <Grid columns='equal' padded>
      
      {lang === true
      ?
      <Grid.Column >
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
          </Grid.Column>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <Grid.Column  >
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
      </Grid.Column>
      }

      <Grid.Column  >
      <Segment>
        {item === 'overview' || item === 'visión de conjunto'
        ? <PatientOverview/>
        : null}
      </Segment>
      </Grid.Column>
      
      </Grid>
      </div>
      </div>
  )
}

export default Patient