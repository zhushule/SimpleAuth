import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li><Link to="/">WelcomePage</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/forgot-password">Forgot Password</Link></li>
          </ul>
        </nav>

        {/* Content Area */}
        <div className="content-area">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/" exact component={WelcomePage} />
            <Route path="/home" component={HomePage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
