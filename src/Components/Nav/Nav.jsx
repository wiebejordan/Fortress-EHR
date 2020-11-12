import React, {useState, useEffect} from 'react';
import {Menu, Dropdown, Input, Button} from 'semantic-ui-react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {getLang} from '../../Redux/languageReducer';
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
        [loggedIn, setLoggedIn] = useState('');
  const state = useSelector(state => state.languageReducer);
  const user = useSelector(state => state.authReducer)
  const dispatch = useDispatch();
  // console.log('state', state)

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
    
    console.log(state.english)
  });

 const handleLogin = () => {

    axios.post('/auth/login', {username, password})
    .then(res => {
      user.getUser(res.data);
      setLoggedIn(res.data.username);
    })
  }

  

  return(
    <div>
    <Menu text>
        <Menu.Item header>J.E.F.F. EMS</Menu.Item>
        {loggedIn === ''
        ? 
        <Menu.Item>
          <Input placeholder='username'/>
          <Input placeholder='password'/>
          <Button onClick={handleLogin}>Login</Button>
        </Menu.Item>

        :
      <>
      <Menu.Item header>{loggedIn}</Menu.Item>
      <Menu.Item>
        <Button>Logout</Button>
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