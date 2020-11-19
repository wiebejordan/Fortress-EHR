import React, {useEffect, useState} from 'react';
import './App.css';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';
import { useSelector, useDispatch } from 'react-redux';
import {useIdleTimer} from 'react-idle-timer';
import {useHistory, useLocation} from 'react-router-dom'
import {Modal, Button, Image, Header} from 'semantic-ui-react'
import axios from 'axios'


function App(props) {
  const [modal, setModal] = useState(false),
        [password, setPassword] = useState(''),
        [username, setUsername] = useState(''),
         history = useHistory(),
         user = useSelector(state => state.authReducer),
         lang = useSelector(state => state.languageReducer),
         idle = useSelector(state => state.idleReducer),
         dispatch = useDispatch();
  
        useEffect(() => {
          setModal(idle.idle)
        }, [])

        useEffect(() => {
          if(user.user.username === ''){
            history.push('/')}
        })


         useEffect(() => {
          setUsername(user.user.username)
        }, [user.user.username]);


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

        // useEffect(() => {
        //   console.log(user.user)
        //   console.log('idle', idle.idle)
        // })

  const handleOnIdle = event => {
    if(history.location.pathname !== '/'){
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
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  const handlePassInput = (e) => {
    setPassword(e)
  }

  const handleIdleLogin = () => {
    axios.post('/auth/login', {username, password})
    .then(res => {
      setUsername(res.data.username);
      dispatch({
        type: 'GET_USER',
        payload: res.data
      })
      setModal(false)
      setPassword('')
    })
    .catch(() => alert('username and password do not match'))
  }

  

  return (
    <div>
      <Nav/>
      {routes}

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
          <Header>{user.user.username}</Header>
          <p>
            Please enter your password to log back in.
          </p>
          <input type='password' onChange={(e) => handlePassInput(e.target.value)} />
        <Button
          content="Log in"
          onClick={() => handleIdleLogin()}
          positive
        />
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
          <Header>{user.user.username}</Header>
          <p>
          por favor ingrese su contraseña para volver a iniciar sesión
          </p>
          <input type='password' onChange={(e) => handlePassInput(e.target.value)} />
         
          <Button
          content="Iniciar sesión"
          onClick={() => handleIdleLogin()}
          positive
        />
        </Modal.Description>
      </Modal.Content>
    </Modal>}
    </div>
  );
}

export default App;
