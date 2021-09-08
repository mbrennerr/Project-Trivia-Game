import React, { Component } from 'react';
import GamePage from '../component/GamePage';
import Header from '../component/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GamePage />
      </div>
    );
  }
}

export default Game;
