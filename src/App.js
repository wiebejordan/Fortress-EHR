import logo from './logo.svg';
import './App.css';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';
import { useSelector } from 'react-redux';
import {useIdleTimer} from 'react-idle-timer';
import {useHistory} from 'react-router-dom'

function App(props) {
  const history = useHistory();

  const handleOnIdle = event => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
    history.push('/')
  }
 
  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
  }
 
  const handleOnAction = (e) => {
    console.log('user did something', e)
  }
 
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })
  return (
    <div>
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
