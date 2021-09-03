import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.HandleOnChange = this.HandleOnChange.bind(this);
    this.HandleOnClick = this.HandleOnClick.bind(this);
  }

  HandleOnChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  HandleOnClick() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, redirect } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-name">
            Nome:
            <input
              placeholder=" digite seu nome..."
              value={ name }
              name="name"
              onChange={ this.HandleOnChange }
              id="input-name"
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              placeholder="digite seu melhor email..."
              value={ email }
              name="email"
              onChange={ this.HandleOnChange }
              id="input-email"
              type="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(name && email) }
            onClick={ this.HandleOnClick }
          >
            Jogar
          </button>
        </form>
        {redirect ? <Redirect to="/game" /> : '' }
      </div>
    );
  }
}

export default LoginComponent;
