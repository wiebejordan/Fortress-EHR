import react, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


const NewUser = () => {
  const [newUser, setNewUser] = useState({firstnm: '', lastnm: '', email: '', password: '', canedit: false}),
        [confPass, setConfPass] = useState(''),
        [adminPass, setAdminPass] = useState(''),
        lang = useSelector(state => state.languageReducer.english),
        user = useSelector(state => state.authReducer),
        history = useHistory();

  return(
    <div>
      <div>
        <p>First Name</p>
        <input></input>

        <p>Last Name</p>
        <input></input>

        <p>Email</p>
        <input></input>

        <p>Password</p>
        <input></input>        

        <p>Confirm Password</p>
        <input></input>

        <p>User Permissions</p> 
        <input type='radio' value='false'></input>
        <label>View Only</label>
        <br/>
        <input type='radio' value='true'></input>
        <label>View, add, and edit records</label>
        

        <p>Administrative Password</p>
        <input></input>
      </div>
    </div>
  )
}

export default NewUser;