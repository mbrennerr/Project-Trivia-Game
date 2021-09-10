import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayAgain from '../component/PlayAgain';
import Header from '../component/Header';
import InfoFeedback from '../component/InfoFeedback';
import FeedbackMessage from '../component/FeedbackMessage';

export default class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          <FeedbackMessage />
          <InfoFeedback />
          <PlayAgain />
        </div>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ranking!
          </button>
        </Link>
      </div>
    );
  }
}
