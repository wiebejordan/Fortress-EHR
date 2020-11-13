import logo from './logo.svg';
import './App.css';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';
import { useSelector } from 'react-redux';
import Login from './Components/Login/Login';

function App() {
  const user = useSelector(state => state.authReducer.user)
  console.log(user)
  return (
    <div>
      <Nav/>
      {routes}
      {user.username == 'Jordo' ? null : <Login/>}
    </div>
  );
}

export default App;
