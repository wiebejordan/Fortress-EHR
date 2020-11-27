import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import '../../styles/style.scss'



const Login = (props) => {
  const [isEnglish, setIsEnglish] = useState(true),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [loggedIn, setLoggedIn] = useState('');
        const user = useSelector(state => state.authReducer)
        const state = useSelector(state => state.languageReducer);
        const dispatch = useDispatch();
  
  const handlePassInput = (e) => {
    setPassword(e)
  }

  const handleUserInput = (e) => {
    setUsername(e)
  }

  useEffect(() => {
    if(user.user.username){
      props.history.push('/main')
    }
  })


  const handleLogin = () => {
    

    axios.post('/auth/login', {username, password})
    .then(res => {
      setLoggedIn(res.data.username);
      dispatch({
        type: 'GET_USER',
        payload: res.data
      })
      props.history.push('/main')
    })
    .catch(() => {
      if(state.english === true){
        alert('username and password do not match')
      }
      else {
        alert('Nombre de usuario y contraseña no coinciden')
      }
    } )
  }
  return(
    <div className='login-container'>
    {state.english === true
    ?
    <div className='login-box'>
      <h4>Welcome to J.E.F.F. Electronic Medical Records!</h4>
      <form onSubmit={handleLogin}>
      <input onChange={(e) => handleUserInput(e.target.value)} placeholder='username'/>
      <input onChange={(e) => handlePassInput(e.target.value)} placeholder='password' type='password'/>
      <button>Login</button>
      </form>
    </div>
    :
    <div className='login-box'>
      <h4>Bienvenido a J.E.F.F. Registros Médicos Electrónicos!</h4>
      <form onSubmit={handleLogin}>
      <input onChange={(e) => handleUserInput(e.target.value)} placeholder='nombre'/>
      <input onChange={(e) => handlePassInput(e.target.value)} placeholder='contraseña' type='password'/>
      <button>Iniciar sesión</button>
      </form>
    </div>
    }
    </div>
  )
}

export default Login;