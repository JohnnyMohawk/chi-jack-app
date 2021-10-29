import React, { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route, useHistory, withRouter} from 'react-router-dom'
import Home from './components/pages/Home';
import Map from './components/pages/Map';
import Graph from './components/pages/Graph';
import Scanner from './components/pages/Scanner';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import WhoIsJack from './components/pages/WhoIsJack';
import JackKnows from './components/pages/JackKnows';
import LoginPage from './components/pages/LoginPage';
import * as authService from './services/authService'

function App(props) {

  const history = useHistory()

  console.log("HISTORY", history)

	const [user, setUser] = useState(authService.getUser())

	const handleLogout = () => {
		authService.logout()
		setUser(null)
		history.push('/')
	}

	const handleSignupOrLogin = () => {
		const user = authService.getUser()
    setUser(user)
	}

  console.log(user)
  console.log("PROPS", props)

  return (
    <Router>
      <NavBar history={history} user={user} handleLogout={handleLogout}/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/map' component={Map} />
        <Route path='/graph' component={Graph} />
        <Route path='/scanner' component={Scanner} />
        <Route path='/sign-up'>
          <SignUp handleSignupOrLogin={handleSignupOrLogin} />
        </Route>
        <Route path='/log-in'>
          <LoginPage handleSignupOrLogin={handleSignupOrLogin} />
        </Route>
        <Route path='/who-is-jack' component={WhoIsJack} />
        <Route path='/how-it-works' component={JackKnows} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default withRouter(App);
