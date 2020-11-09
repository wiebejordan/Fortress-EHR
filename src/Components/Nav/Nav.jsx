import React, {useState, useEffect} from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {getLang} from '../../Redux/languageReducer';


 


const langOptions = [
  {
    key: 'English',
    text: 'English',
    value: 'true'
  },
  {
    key: 'Spanish',
    text: 'Spanish',
    value: 'false'
  }

]

const Nav = (props) => {
  const [isEnglish, setIsEnglish] = useState(true);
  const state = useSelector(state => state.languageReducer);
  const dispatch = useDispatch();
  // console.log('state', state)

 const handleLang = (props) => {
    setIsEnglish(!isEnglish)
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: {
        english: !isEnglish
      }
    })
  }

  useEffect(() => {
    // console.log(isEnglish);
    // console.log(state)
  });

  return(
    <div>
    <Menu text>
        <Menu.Item header>J.E.F.F. EMS</Menu.Item>
        <Menu.Item header>Wiebe, Cicely</Menu.Item>
        <Menu.Item
          name='Logout'
          
        />
        
      <Dropdown
      placeholder='English'
      defaultValue='true'
      selection
      compact
      options={langOptions}
      onChange={handleLang}/>
      </Menu>
      
      </div>
  )
}

export default Nav;