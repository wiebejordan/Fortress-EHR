import logo from './logo.svg';
import './App.css';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector(state => state.authReducer.user)
  return (
    <div>
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
