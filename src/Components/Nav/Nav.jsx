import React, {useState, useEffect} from 'react';
import {Menu, Dropdown, Input, Button, Header} from 'semantic-ui-react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';



 


const langOptions = [
  {
    key: 'English',
    text: 'English',
    value: true
  },
  {
    key: 'Spanish',
    text: 'Spanish',
    value: false
  }

]

const Nav = (props) => {
  const [isEnglish, setIsEnglish] = useState(true),
        [username, setUsername] = useState(''),
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


  useEffect(() => {
    
    
    
  });

  const handlePassInput = (e) => {
    setPassword(e)
  }

  const handleUserInput = (e) => {
    setUsername(e)
  }

 const handleLogin = () => {

    axios.post('/auth/login', {username, password})
    .then(res => {
      setLoggedIn(res.data.username);
      dispatch({
        type: 'GET_USER',
        payload: res.data
      })
    })
    .catch(() => alert('username and password do not match'))
  }


 const logout = () => {
   axios.post('/auth/logout')
   .then(() => {
     setLoggedIn('')
     setUsername('')
     setPassword('')
     dispatch({
       type: 'CLEAR_USER',
       payload: {user: {
        username: '',
        canedit: ''
      }}
     })
    })
    history.push('/')
 }

  
  

  return(
    <div>
    <Menu text>
        {location.pathname !== '/'
        ? 
        <Menu.Item>
          <Link to='/main'>
          <Header>J.E.F.F. EMR</Header>
          </Link>
        </Menu.Item>
        : <Menu.Item>
        
        <Header>J.E.F.F. EMR</Header>
        
      </Menu.Item>}

        {!user.user.username 
        ? 
        // <Menu.Item>
        //   <Input placeholder='username' onChange={(e) => handleUserInput(e.target.value)}/>
        //   <Input type='password' placeholder='password' onChange={(e) => handlePassInput(e.target.value)}/>
        //   <Button onClick={handleLogin}>Login</Button>
        // </Menu.Item>
          null
        :
      <>
      <Menu.Item header>{user.user.username}</Menu.Item>
      <Menu.Item>
        <Button onClick={logout}>Logout</Button>
      </Menu.Item>
      </>
      }
        
      <Dropdown
      // placeholder='English'
      defaultValue={state.english}
      selection
      compact
      options={langOptions}
      onChange={handleLang}/>
      </Menu>
      
      </div>
  )
}

export default Nav;