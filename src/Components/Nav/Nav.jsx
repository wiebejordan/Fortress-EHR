import React, {useState} from 'react';
import {Menu} from 'semantic-ui-react';

const Nav = () => {
  const [english, setEnglish] = useState(true);
  
  return(
    <Menu text>
        <Menu.Item header>J.E.F.F. EMS</Menu.Item>
        <Menu.Item header>Wiebe, Cicely</Menu.Item>
        <Menu.Item
          name='Logout'
          
        />
      </Menu>
  )
}

export default Nav;