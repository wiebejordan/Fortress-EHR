import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Loader, Menu, Segment, Grid, Container, MenuItem} from 'semantic-ui-react';
import PatientOverview from '../PatientOverview/PatientOverview';
import PatientHistory from '../PatientHistory/PatientHistory';
import Medications from '../Medications/Medications';
import Immunizations from '../Immunizations/Immunizations';
import Visualization from '../Visualization/Visualization';
import ActiveProblems from '../ActiveProblems/ActiveProblems';
import NewEncounter from '../NewEncounter/NewEncounter';





 const PatientMain = (props) => {
  const [item, setItem] = useState('overview'),
        [patient, setPatient] = useState({}),
        [encounters, setEncounters] = useState([]),
        [toggleEncounter, setToggleEncounter ] = useState(false),
  user = useSelector(state => state.authReducer),
  lang = useSelector(state => state.languageReducer.english);
  // console.log('enc', encounters)
  

  useEffect(() => {
    if(props.match.params.patientid){
      axios.get(`/api/patient/${props.match.params.patientid}`)

      .then(res => {
        setPatient(res.data[0])
      })
      .catch(err => console.log(err))

      axios.get(`/api/encounters/${props.match.params.patientid}`)
      
      .then(res => {
        setEncounters(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [])

  const handleItemClick = (e, { name }) => setItem(name);

  const toggleEnc = () => {
    setToggleEncounter(!toggleEncounter)
  }
  
  
  return(
    <div>
      <h1 style={{textAlign: 'center'}}>{patient.lastnm}, {patient.firstnm}</h1>
      <div className='patient-grid-container'>
      <Grid stackable  padded>
      <Grid.Row style={{paddingBottom: '0px'}}>
      <Grid.Column width={3} >
      {lang === true
      ?
      <Menu compact vertical>
        
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
      
      <Menu compact vertical>
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
      </Grid.Column>

      <Grid.Column  width={11}>
      <Segment>
        {item === 'overview' || item === 'visión de conjunto'
        ? <PatientOverview patient={patient} encounters={encounters}/>
        : null}

        {item === 'patient history' || item === 'historial del paciente'
        ? <PatientHistory patient={patient} encounters={encounters}/>
        : null}

        {item === 'active problems' || item === 'problemas activos'
        ? <ActiveProblems patient={patient} encounters={encounters}/>
        : null}

        {item === 'medications' || item === 'medicamentos'
        ? <Medications patient={patient} encounters={encounters}/>
        : null}

        {item === 'immunizations' || item === 'inmunizaciones'
        ? <Immunizations patient={patient} encounters={encounters}/>
        : null}

        {item === 'visualization' || item === 'visualizaciones'
        ? <Visualization patient={patient} encounters={encounters}/>
        : null}
      </Segment>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>

        <Menu compact>
        {lang === true
        ?
        <Menu.Item
          name='New Encounter'
          active={toggleEncounter === true}
          onClick={toggleEnc}
          color='green'
        />
        :
        <Menu.Item
          name='Nuevo Encuentro'
          active={toggleEncounter === true}
          onClick={toggleEnc}
          color='green'
        />
        }
        </Menu>
        </Grid.Column>
        {toggleEncounter === true
        ?
        <Grid.Column width={11}>
          <Segment>
            <NewEncounter patient={patient}/>
          </Segment>
        
        </Grid.Column>
        :
        null}
      </Grid.Row>
    
      </Grid>
      
      </div>
      </div>
  )
}

export default PatientMain