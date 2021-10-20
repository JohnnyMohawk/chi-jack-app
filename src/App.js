import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Map from './components/pages/Map';
import Graph from './components/pages/Graph';
import Scanner from './components/pages/Scanner';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/map' component={Map} />
        <Route path='/graph' component={Graph} />
        <Route path='/scanner' component={Scanner} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
