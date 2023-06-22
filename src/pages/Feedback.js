import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateGravatarURL } from '../services/gravatarFunctions';

class Feedback extends Component {
  render() {
    const { score, name, email, assertions } = this.props;
    const minimumAssertions = 3;
    return (
      <>

        <p>Feedback</p>
        <img
          data-testid="header-profile-picture"
          alt="Player Avatar"
          src={ generateGravatarURL(email) }
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>

        <p
          data-testid="feedback-text"
        >
          {assertions < minimumAssertions ? 'Could be better...' : 'Well Done!'}

        </p>

        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>

      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  score: globalState.score,
  assertions: globalState.assertions,
  name: globalState.name,
  email: globalState.email,
});

export default connect(mapStateToProps)(Feedback);
