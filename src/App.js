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
    timeout: 1000 * 60 * 5,
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
      <div >

      {routes}
      </div>
      
      
      {lang.english 
      ?

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
          <Header>{user.user.firstnm}
          {user.user.lastnm ? user.user.lastnm[0] : null}</Header>
          <p>
            Please enter your password to log back in.
          </p>
          <form onSubmit={handleIdleLogin}>
          <input type='password' onChange={(e) => handlePassInput(e.target.value)} />
        <Button
          content="Log in"
          positive
        />

          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    :
    <Modal
      onClose={() => setModal(false)}
      onOpen={() => setModal(true)}
      open={modal}
      closeOnDimmerClick={false}
      closeOnEscape={false}
      dimmer='blurring'
      size='mini'
    >

      <Modal.Content>
        
        <Modal.Description>
          <Header>{user.user.firstnm} {user.user.lastnm ? user.user.lastnm[0] : null}</Header>
          <p>
          por favor ingrese su contraseña para volver a iniciar sesión
          </p>
          <form onSubmit={handleIdleLogin}>
          <input type='password' onChange={(e) => handlePassInput(e.target.value)} />
        <Button
          content="
          Iniciar sesión"
          positive
        />
        </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>}
    

    <Footer/>
   
    
    </div>
  );
}

export default App;
