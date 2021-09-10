import React, { Component } from 'react';
import { connect } from 'react-redux';

class InfoFeedback extends Component {
  render() {
    const score = localStorage.getItem('state');
    const scor = JSON.parse(score);
    // console.log(scor);
    return (
      <div>
        <p data-testid="feedback-total-score">
          { scor.player.score }
        </p>
        <p data-testid="feedback-total-question">
          { scor.player.assertions }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.reducerLogin.assertions,
});

export default connect(mapStateToProps)(InfoFeedback);
