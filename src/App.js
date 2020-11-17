import React, {useEffect, useState} from 'react';
import './App.css';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';
import { useSelector, useDispatch } from 'react-redux';
import {useIdleTimer} from 'react-idle-timer';
import {useHistory} from 'react-router-dom'
import {Modal, Button, Image, Header} from 'semantic-ui-react'
import axios from 'axios'


function App(props) {
  const [modal, setModal] = useState(false),
        [password, setPassword] = useState(''),
        [username, setUsername] = useState(''),
         history = useHistory(),
         user = useSelector(state => state.authReducer),
         lang = useSelector(state => state.languageReducer),
         dispatch = useDispatch();
  
  
         useEffect(() => {
          setUsername(user.user.username)
    
        }, []);

        useEffect(() => {
          console.log(password)
        })

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
    timeout: 10000,
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
      open={modal}
      closeOnDimmerClick={false}
      closeOnEscape={false}
      
    >

      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>{user.user.username}</Header>
          <p>
            Please enter your password to log back in.
          </p>
          <input type='password' onChange={(e) => handlePassInput(e.target.value)} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        
        <Button
          content="Log in"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleIdleLogin()}
          positive
        />
      </Modal.Actions>
    </Modal>
    :
    <Modal
      onClose={() => setModal(false)}
      onOpen={() => setModal(true)}
      open={modal}
      closeOnDimmerClick={false}
      closeOnEscape={false}
      
    >

      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>{user.user.username}</Header>
          <p>
          por favor ingrese su contraseña para volver a iniciar sesión
          </p>
          <input type='password' onChange={(e) => handlePassInput(e.target.value)} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        
        <Button
          content="Log in"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleIdleLogin()}
          positive
        />
      </Modal.Actions>
    </Modal>}
    </div>
  );
}

export default App;
