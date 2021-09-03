import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Hello, tryber!</h1>
          <p data-testid="header-player-name"> Nome: </p>
          <img data-testid="header-profile-picture" src="" alt="ícone do jogador" />
          <p data-testid="header-score">Placar: </p>
        </header>
      </div>
    );
  }
}

export default Header;
