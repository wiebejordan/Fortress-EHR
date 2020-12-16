import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import '../../styles/style.scss'



const Login = (props) => {
  const [isEnglish, setIsEnglish] = useState(true),
        [email, setemail] = useState(''),
        [password, setPassword] = useState(''),
        [loggedIn, setLoggedIn] = useState('');
        const user = useSelector(state => state.authReducer)
        const state = useSelector(state => state.languageReducer);
        const dispatch = useDispatch();
  
  const handlePassInput = (e) => {
    setPassword(e)
  }

  const handleUserInput = (e) => {
    setemail(e)
  }

  useEffect(() => {
    if(user.user.email){
      props.history.push('/main')
    }
  })


  const handleLogin = (e) => {
    e.preventDefault()

    axios.post('/auth/login', {email, password})
    .then(res => {
      setLoggedIn(res.data.email);
      dispatch({
        type: 'GET_USER',
        payload: res.data
      })
      props.history.push('/main')
    })
    .catch(() => {
      if(state.english === true){
        alert('email and password do not match')
      }
      else {
        alert('Nombre de usuario y contraseña no coinciden')
      }
    } )
  }
  return(
    <div>
    <div className='login-container'>
    {state.english === true
    ?
    <div className='login-box'>
      <h4>Welcome to FORTRESS Electronic Medical Records!</h4>
      <form onSubmit={handleLogin}>
      <input onChange={(e) => handleUserInput(e.target.value)} placeholder='email'/>
      <input onChange={(e) => handlePassInput(e.target.value)} placeholder='password' type='password'/>
      <button>Login</button>
      </form>
      <Link to='/newuser'>
      <button>New User</button>
      </Link>
    </div>
    :
    <div className='login-box'>
      <h4>Bienvenido a FORTRESS Registros Médicos Electrónicos!</h4>
      <form onSubmit={handleLogin}>
      <input onChange={(e) => handleUserInput(e.target.value)} placeholder='correo electrónico'/>
      <input onChange={(e) => handlePassInput(e.target.value)} placeholder='contraseña' type='password'/>
      <button>Iniciar sesión</button>
      </form>
      <Link to='/newuser'>
      <button>Nuevo Usuario</button>
      </Link>
    </div>
    }

    </div>
    
    <div className='about-container'>
      <h1>What is Fortress EMR?</h1>

      <p>Fortress EMR was born from the belief that every child, no matter their circumstances, deserves the best medical care possible. We believe this is especially true for children in orphanages, foster homes, and impoverished areas. In situations like these, where children receive much of their medical care from incoming and rotating short-term teams, it is essential for these teams to have access to each child's medical records so they can maximize their care giving efforts. </p>

      <p>Fortress EMR provides custom, multilingual electronic medical records in an easy to use and secure platform.  </p>
    </div>
    </div>
  )
}

export default Login;