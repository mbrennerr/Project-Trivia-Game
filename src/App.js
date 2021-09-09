import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import FeedBack from './pages/FeedBack';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ FeedBack } />
      </Switch>
    );
  }
}

export default App;
