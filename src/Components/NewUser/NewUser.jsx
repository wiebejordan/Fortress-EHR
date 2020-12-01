import react, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';


const NewUser = () => {
  const [newUser, setNewUser] = useState({firstnm: '', lastnm: '', email: '', password: '', canedit: false}),
        [confPass, setConfPass] = useState(''),
        [adminPass, setAdminPass] = useState(''),
        lang = useSelector(state => state.languageReducer.english),
        user = useSelector(state => state.authReducer),
        history = useHistory();
    console.log(adminPass)

  const handleInput = (e, result) => {
   const {name, value} = result || e.target;
  setNewUser({...newUser, [name]: value});
    if(value === 'true'){
      setNewUser({...newUser, canedit: true})
    }
    else if(value === 'false'){
      setNewUser({...newUser, canedit: false})
    }
  };

  const handleAdminPass = (e, result) => {
    const{name, value} = result || e.target;
    setAdminPass(value)
  }
  

  const handleSubmit = () => {
    const {firstnm, lastnm, email, password, canedit} = newUser;

    if(canedit === true){
      axios.post('/auth/newuseradmin', {firstnm, lastnm, email, password, canedit, adminPass} )
    }
    
    axios.post('/auth/newuser', {firstnm, lastnm, email, password, canedit})

    
  }

  return(
    <div>
      <div>
        <p>First Name</p>
        <input onChange={(e) => handleInput(e)} name='firstnm'></input>

        <p>Last Name</p>
        <input onChange={(e) => handleInput(e)} name='lastnm'></input>

        <p>Email</p>
        <input type='email' onChange={(e) => handleInput(e)} name='email'></input>

        <p>Password</p>
        <input type='password' onChange={(e) => handleInput(e)} name='password'></input>        

        <p>Confirm Password</p>
        <input type='password' onChange={(e) => handleInput(e)} name='confPass'></input>

        <p>User Permissions</p> 
        <input type='radio' value='false' onChange={(e) => handleInput(e)} name='canedit' defaultChecked></input>
        <label>View Only</label>
        <br/>
        <input type='radio' value='true' onChange={(e) => handleInput(e)} name='canedit'></input>
        <label>View, add, and edit records</label>
        
        {newUser.canedit === true
        ?
        <>
        <p>Administrative Password</p>
        <input type='password' onChange={(e) => handleAdminPass(e)} ></input>
        </>
        :
        null}
      </div>
    </div>
  )
}

export default NewUser;