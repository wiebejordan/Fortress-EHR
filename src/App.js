import React, {useEffect, useState} from 'react';
import './styles/style.scss';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {useIdleTimer} from 'react-idle-timer';
import {useHistory, useLocation} from 'react-router-dom'
import {Modal, Button, Image, Header} from 'semantic-ui-react'
import {Grid, TextField} from '@material-ui/core'
import axios from 'axios'


function App(props) {
  const [modal, setModal] = useState(false),
        [password, setPassword] = useState(''),
        [email, setemail] = useState(''),
         history = useHistory(),
         user = useSelector(state => state.authReducer),
         lang = useSelector(state => state.languageReducer),
         idle = useSelector(state => state.idleReducer), 
         dispatch = useDispatch();

        useEffect(() => {
          setModal(idle.idle)
        }, [])

        useEffect(() => {
          if(user.user.email === ''){
            history.push('/')}
        })


         useEffect(() => {
          setemail(user.user.email)
        }, [user.user.email]);


        useEffect(() => {
          if(modal === true){
            dispatch({
              type: 'IDLE_TRUE',
              payload: {idle: true}
            })
          } else
            dispatch({
              type: 'IDLE_FALSE',
              payload: {idle: false}
            })
        }, [modal, idle.idle])

        

  const handleOnIdle = event => {
    if(history.location.pathname !== '/' && history.location.pathname !== '/newuser' ){
      setModal(true)

    }
    // console.log('user is idle', event)
    // console.log('last active', getLastActiveTime())
  }
 
  const handleOnActive = event => {
    // console.log('user is active', event)
    // console.log('time remaining', getRemainingTime())
  }
 
  const handleOnAction = (e) => {
    // console.log('user did something', e)
  }
 
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 
    1000 * 60 * 5,
   
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  const handlePassInput = (e) => {
    setPassword(e)
  }

  const handleIdleLogin = (e) => {
    e.preventDefault()
    
    axios.post('/auth/login', {email, password})
    .then(res => {
      setemail(res.data.email);
      dispatch({
        type: 'GET_USER',
        payload: res.data
      })
      setModal(false)
      setPassword('')
    })
    .catch(() => {
      if(lang.english === true){
        alert('email and password do not match')
      }
      else {
        alert('Nombre de usuario y contraseña no coinciden')
      }
    })
  }

  

  return (
    <div>
      <Nav/>
      <div style={{height: '100%'}}>

      {routes}
      </div>
      
      
    

      <Modal
      onClose={() => setModal(false)}
      onOpen={() => setModal(true)}
      open={idle.idle}
      closeOnDimmerClick={false}
      closeOnEscape={false}
      dimmer='blurring'
      size='mini'
      
      
    >

      <Modal.Content centered>
        
        <Modal.Description>
          <Grid container direction='column' justifyContent='space-around' alignItems='center' style={{height: '175px'}}>
          <Header>{user.user.firstnm}
          {user.user.lastnm ? user.user.lastnm[0] : null}</Header>
          <p>
            {lang.english ? 'Please enter your password to log back in.' : 'por favor ingrese su contraseña para volver a iniciar sesión'}
          </p>
  
          <TextField placeholder={lang.english ? 'password' : 'contraseña'} variant='outlined' size='small' type='password' onChange={(e) => handlePassInput(e.target.value)} />
        <Button
          content={lang.english ? "Log in" : 'Iniciar sesión' }
          positive
          onClick={handleIdleLogin}
        />
         
          
        

          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    
    

    <Footer/>
   
    
    </div>
  );
}

export default App;
