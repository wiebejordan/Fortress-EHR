import logo from './logo.svg';
import './App.css';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div>
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
