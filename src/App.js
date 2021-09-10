import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ FeedBack } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
