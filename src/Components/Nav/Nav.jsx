import React, {useState, useEffect} from 'react';
import {Menu, Dropdown, Image, Button, Header} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../styles/style.scss';


 


const langOptions = [
  {
    key: 'English',
    text: 'English',
    value: true
  },
  {
    key: 'Español',
    text: 'Español',
    value: false
  }

]

const Nav = (props) => {
  const [isEnglish, setIsEnglish] = useState(true),
        [email, setemail] = useState(''),
        [password, setPassword] = useState(''),
        [loggedIn, setLoggedIn] = useState(''),
         state = useSelector(state => state.languageReducer),
         reducer = useSelector(state => state),
        user = useSelector(state => state.authReducer),
        location = useLocation(),
        history = useHistory();

  const dispatch = useDispatch();
  

 const handleLang = () => {
    setIsEnglish(!isEnglish)

    if(state.english === true){
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: {
        english: false
      }
    })
    }
    else if(state.english === false){
      dispatch({
        type: 'CHANGE_LANGUAGE',
        payload: {
          english: true
        }
      })
      }
  }



  const handlePassInput = (e) => {
    setPassword(e)
  }

  const handleUserInput = (e) => {
    setemail(e)
  }

 const handleLogin = () => {

    axios.post('/auth/login', {email, password})
    .then(res => {
      setLoggedIn(res.data.email);
      dispatch({
        type: 'GET_USER',
        payload: res.data
      })
    })
    .catch(() => alert('email and password do not match'))
  }


 const logout = () => {
   axios.post('/auth/logout')
   .then(() => {
     setLoggedIn('')
     setemail('')
     setPassword('')
     dispatch({
       type: 'CLEAR_USER',
       payload: {user: {
        email: '',
        canedit: ''
      }}
     })
    })
    history.push('/')
 }

  
  

  return(
    <div>
    <Menu text style={{margin: '0'}}>
      
        {location.pathname !== '/'
        ? 
        <>
        <Menu.Item>
          <Image circular size='tiny' src='https://i.imgur.com/bgAzgoV.jpg'/>
          
        </Menu.Item>

        <Menu.Item>
          {state.english
          ?
          <Link to='/main'>
            <Button basic>Home</Button>
          </Link>
          :
          <Link to='/main'>
            <Button basic>Inicio</Button>
          </Link>
          }
        </Menu.Item>
        </>
        : <Menu.Item>
        
        <Image circular size='tiny' src='https://i.imgur.com/bgAzgoV.jpg'/>
        
      </Menu.Item>}

        
      
      <div className='language-dropdown'>

      {!user.user.email 
        ? 
          null
        :
      <>
      
      <Menu.Item header>{user.user.lastnm}, {user.user.firstnm}</Menu.Item>
      {state.english === true ?
      <Menu.Item>
        <Button onClick={logout}>Logout</Button>
      </Menu.Item>
      : 
      <Menu.Item>
        <Button onClick={logout}>Cerrar sesión</Button>
      </Menu.Item>}
      
      </>
      }

      <Menu.Item style={{marginRight: '20px'}}>
      <Dropdown
      defaultValue={state.english}
      selection
      compact
      options={langOptions}
      onChange={handleLang}/>
      </Menu.Item>
      </div>
      </Menu>
      
      </div>
  )
}

export default Nav;