import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMessage extends Component {
  render() {
    const { infoPlayer } = this.props;
    const { assertions } = infoPlayer;
    const THREE = 3;
    return assertions >= THREE ? (
      <h1>Mandou bem!</h1>
    ) : (
      <h1>Podia ser melhor...</h1>
    );
  }
}
const mapStateToProps = (state) => ({
  infoPlayer: state.reducerLogin,
});

FeedbackMessage.propTypes = {
  infoPlayer: PropTypes.shape().isRequired,
};
export default connect(mapStateToProps)(FeedbackMessage);
