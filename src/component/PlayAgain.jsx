import React, { Component } from 'react';
import { Redirect } from 'react-router';

class PlayAgain extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.handleOnClicRedirect = this.handleOnClicRedirect.bind(this);
  }

  handleOnClicRedirect() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        { redirect ? <Redirect to="/" /> : false}
        <button
          type="button"
          onClick={ this.handleOnClicRedirect }
          data-testid="btn-play-again"
        >
          jogar novamente
        </button>
      </div>
    );
  }
}

export default PlayAgain;
