import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Prompt} from 'react-router-dom';
import {Loader, Menu, Segment, Grid, Container, MenuItem} from 'semantic-ui-react';
import PatientOverview from '../PatientOverview/PatientOverview';
import PatientHistory from '../PatientHistory/PatientHistory';
import Medications from '../Medications/Medications';
import Immunizations from '../Immunizations/Immunizations';
import Visualization from '../Visualization/Visualization';
import EncounterHistory from '../ActiveProblems/EncounterHistory';
import NewEncounter from '../NewEncounter/NewEncounter';
import NewWindow from 'react-new-window';





 const PatientMain = (props) => {
  const [item, setItem] = useState('patient history'),
        [patient, setPatient] = useState({}),
        [encounters, setEncounters] = useState([{commenttxt: ''}]),
        [immunes, setImmunes] = useState([]),
        [allergies, setAllergies] = useState([]),
        [meds, setMeds] = useState([]),
        [toggleEncounter, setToggleEncounter ] = useState(false),
        [togglePopout, setTogglePopout] = useState(false),
        [loading, setLoading] = useState(true),
        [isBlocking, setIsBlocking] = useState(false),
  user = useSelector(state => state.authReducer),
  newEnc = useSelector(state => state.newEncReducer),
  history = useHistory(),
  dispatch = useDispatch(),
  lang = useSelector(state => state.languageReducer.english);
  console.log('enc', togglePopout)

  useEffect(() => {
    if(!user.user.email){
      history.push('/')}
  })

   useEffect(() => {
    if(props.match.params.patientid){
      getPatientData();
    }
    
    setLoading(false)

    return function cleanup() {
      dispatch({
        type: 'CLEAR_ENC',
        payload: {
          patientid: null, 
          encounterdts: '', 
          weight_lbs: '', 
          height_inch: '', 
          systolic_bp: null, 
          diastolic_bp: null, 
          heart_rate: null, 
          respirations_min: null, 
          commenttxt: ''
        } 
      })
    }
  }, [])

  useEffect(() => {
    if(
      toggleEncounter
    ){
      setIsBlocking(true)
    }
  })

  

  const getPatientData = async () => {
    try{
      const res = await axios.get(`/api/patient/${props.match.params.patientid}`);
        setPatient(res.data[0])
        setItem('overview')
      }
      catch(err){
        console.log(err)
      }

      try{
       const res = await axios.get(`/api/encounters/${props.match.params.patientid}`);
        setEncounters(res.data)
      }
      catch(err){
        console.log(err)
      }

      try{
        const res = await axios.get(`/api/immunes/${props.match.params.patientid}`);
         setImmunes(res.data)
       }
       catch(err){
         console.log(err)
       }

       try{
        const res = await axios.get(`/api/allergies/${props.match.params.patientid}`);
         setAllergies(res.data)
       }
       catch(err){
         console.log(err)
       }

       try{
        const res = await axios.get(`/api/medications/${props.match.params.patientid}`);
         setMeds(res.data)
       }
       catch(err){
         console.log(err)
       }
  }

  const handleItemClick = (e, { name }) => setItem(name);

  const toggleEnc = () => {
    setToggleEncounter(!toggleEncounter)
  }

  const handlePopout = () => {
    if(!togglePopout){
      setTogglePopout(true)
    }
  }

  
  
  
  return(
    <div style={{marginBottom: '25px'}}>
      {loading === true 
      ? <Loader size='massive' active />
      : 
      <h1 style={{textAlign: 'center'}}>{patient.lastnm}, {patient.firstnm}</h1>
      }
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
          name='encounter history'
          active={item === 'encounter history' || item === 'historia de encuentros'}
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
            name='historia de encuentros'
            active={item === 'encounter history' || item === 'historia de encuentros'}
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
        ? <PatientOverview patient={patient} encounters={encounters} immunes={immunes} allergies={allergies} user={user} meds={meds}/>
        : null}

        {item === 'patient history' || item === 'historial del paciente'
        ? <PatientHistory patient={patient} encounters={encounters} immunes={immunes} allergies={allergies} user={user} meds={meds}/>
        : null}

        {item === 'encounter history' || item === 'historia de encuentros'
        ? <EncounterHistory patient={patient} encounters={encounters} immunes={immunes} allergies={allergies} meds={meds}/>
        : null}

        {item === 'medications' || item === 'medicamentos'
        ? <Medications patient={patient} encounters={encounters} immunes={immunes} allergies={allergies} meds={meds}/>
        : null}

        {item === 'immunizations' || item === 'inmunizaciones'
        ? <Immunizations patient={patient} encounters={encounters} immunes={immunes} allergies={allergies} user={user} meds={meds}/>
        : null}

        {item === 'visualization' || item === 'visualizaciones'
        ? <Visualization patient={patient} encounters={encounters} immunes={immunes} allergies={allergies} meds={meds}/>
        : null}
      </Segment>
      </Grid.Column>
      </Grid.Row>
        {user.user.canedit === true
        ?
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
            <NewEncounter patient={patient} toggleEncounter ={toggleEncounter} handlePopout = {handlePopout}/>
          </Segment>
        
        </Grid.Column>
        :
        null}
      </Grid.Row>
        : null }

      </Grid>
      
      {togglePopout ? 
      <NewWindow title={`New Encounter for ${patient.lastnm}, ${patient.firstnm}`}>
        <NewEncounter patient={patient} toggleEncounter ={toggleEncounter}/>
      </NewWindow>
      : null}

      <Prompt
      when={isBlocking === true}
      message={lang === true ?'You have a new encounter with unsaved changes, are you sure you want to leave?' : 'Tienes un nuevo encuentro con cambios no guardados, ¿estás seguro de que quieres irte?'}
    />
      
      
      </div>
      </div>
  )
}

export default PatientMain