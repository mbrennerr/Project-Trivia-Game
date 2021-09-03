import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ConfigComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectConfig: false,
    };
    this.handleConfigClick = this.handleConfigClick.bind(this);
  }

  handleConfigClick() {
    this.setState({
      redirectConfig: true,
    });
  }

  render() {
    const { redirectConfig } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigClick }
        >
          Configurações
        </button>
        {redirectConfig ? <Redirect to="/config" /> : ''}
      </div>
    );
  }
}

export default ConfigComponent;
