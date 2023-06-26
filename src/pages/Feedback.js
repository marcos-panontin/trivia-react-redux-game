import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateGravatarURL } from '../services/gravatarFunctions';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  render() {
    const { score, name, email, assertions, history, dispatch } = this.props;
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

        <p>
          Score:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <p>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>

        <button
          data-testid="btn-play-again"
          onClick={ () => {
            dispatch(resetScore());
            history.push('/');
          } }
        >
          Play Again!

        </button>

        <button
          data-testid="btn-ranking"
          onClick={ () => { history.push('/ranking'); } }
        >
          Ranking

        </button>

      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
  name: player.name,
  email: player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
