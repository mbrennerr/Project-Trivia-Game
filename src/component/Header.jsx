import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { infoPlayer } = this.props;
    const { name, gravatarImage, score } = infoPlayer;
    return (
      <div>
        <header>
          <h1>Hello, tryber!</h1>
          <p data-testid="header-player-name">
            Nome:
            { name }
          </p>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt="ícone do jogador"
          />
          <p data-testid="header-score">
            Placar:
            { score }
          </p>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  infoPlayer: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  infoPlayer: state.reducerLogin,
});

export default connect(mapStateToProps)(Header);
