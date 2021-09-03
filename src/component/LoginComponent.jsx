import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { clickLogin, fetchGravatar } from '../actions/loginActions';

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
    const { login, image } = this.props;
    const { email } = this.state;
    this.setState({
      redirect: true,
    });
    login(this.state);
    image(md5(email).toString());
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

LoginComponent.propTypes = {
  image: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(clickLogin(payload)),
  image: (payload) => dispatch(fetchGravatar(payload)),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
