import react, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Grid,
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";

const NewUser = () => {
  const [newUser, setNewUser] = useState({firstnm: '', lastnm: '', email: '', password: '', canedit: false, confPass: ''}),
        [adminPass, setAdminPass] = useState(''),
        lang = useSelector(state => state.languageReducer.english),
        user = useSelector(state => state.authReducer),
        dispatch = useDispatch(),
        history = useHistory();
    // console.log(lang)

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
    const {firstnm, lastnm, email, password, canedit, confPass} = newUser;

    if(password !== confPass){
      alert("passwords don't match")
    } 

    if(canedit === true && adminPass !== '12345'){
      alert("Admin password incorrect")
    }

    if(!email){
      alert("please enter an email address")
    }

    if(email && email.includes('@') === true && canedit === true && adminPass === '12345' && password && password === confPass){
      axios.post('/auth/newuseradmin', {firstnm, lastnm, email, password, canedit, adminPass} )

      .then(res => {
        dispatch({
          type: 'GET_USER',
          payload: res.data
        })
        history.push('/main')
        if(lang === true){
          alert('User registration successful!')
        } else{
          alert('Registro de usuario exitoso')
        }
      })
      .catch(err => alert('a user with that email already exists.'))
    }
    else if(email && email.includes('@') === true && canedit === false && password && password === confPass){
      axios.post('/auth/newuser', {password, canedit, firstnm, lastnm, email})

      .then(res => {
        dispatch({
          type: 'GET_USER',
          payload: res.data
        })
        history.push('/main')
        if(lang === true){
          alert('User registration successful!')
        } else{
          alert('Registro de usuario exitoso')
        }
      })
      .catch(err => alert('a user with that email already exists.'))
    }

    
  }

  return(
    <div>
      <Grid container justifyContent='center'>

      <h2>{lang === true ? 'New User' : 'Nuevo Usuario' }</h2>
      </Grid>
      <Grid container justifyContent='space-around' style={{height: '200px'}}>
        <Grid container direction='column' justifyContent='space-around' xs={4}>
          <TextField 
          variant="outlined"
          label={lang === true ? "First Name" : 'Primer nombre'}
          onChange={(e) => handleInput(e)}
          name="firstnm"
          />

            <TextField
            variant="outlined"
            label={lang === true ? "Last Name" : 'Apellido'}
            onChange={(e) => handleInput(e)}
            name="lastnm"
          ></TextField>

<TextField
            variant="outlined"
            label={lang === true ? "Email" : 'Correo Electrónico'}
            onChange={(e) => handleInput(e)}
            name="email"
          ></TextField>
          </Grid>

          <Grid container direction='column' justifyContent='space-evenly' xs={4}>

          

<TextField
            variant="outlined"
            label={lang === true ? "Password" : 'Contraseña'}
            onChange={(e) => handleInput(e)}
            name="password"
          ></TextField>

<TextField
            variant="outlined"
            label={lang === true ? "Confirm Password" : 'Confirmar Contraseña'}
            onChange={(e) => handleInput(e)}
            name="confPass"
          ></TextField>



            </Grid>
            
      </Grid>
      <Grid container alignItems='center' justifyContent='center'>
<FormControl component="fieldset">
            <FormLabel component="legend">{lang === true ? "User Permissions" : "Permisos de Usuario"}</FormLabel>
            <RadioGroup
              aria-label="Sex"
              defaultValue="female"
              name="canedit"
              onChange={(e) => handleInput(e)}
            >
              <FormControlLabel
                value="false"
                control={<Radio />}
                label={lang === true ? "View Only" : "Sólo vista"}
              />
              <FormControlLabel value="true" control={<Radio />} label={lang === true ? "View, add, and edit records" : "Ver, agregar y editar registros"} />
            </RadioGroup>
          </FormControl>
          {newUser.canedit === true
        &&
          <TextField  variant="outlined"
            label={lang === true ? "Administrative Password" : 'Contraseña Administrativa'}
            onChange={(e) => handleAdminPass(e)}
            style={{marginRight:'10px', width: '200px'}}
             />
          }
          <Button
          variant='contained' onClick={handleSubmit}
          >
            {lang === true ? 'Submit' : 'Entregar'}
          </Button>
          
          </Grid>
     
  </div>)
}

export default NewUser;