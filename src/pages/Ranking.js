import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateGravatarURL } from '../services/gravatarFunctions';

class Ranking extends Component {
  render() {
    const { score, name, history, email } = this.props;
    const playersRanked = localStorage.getItem('players Ranking');
    console.log(playersRanked);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div>
          <img
            alt="Player Avatar"
            src={ generateGravatarURL(email) }
          />
          <h4 data-testid="player-name">
            Player Name:
            {' '}
            {name}
          </h4>
          <h4 data-testid="player-score">
            Player Score:
            {' '}
            {score}
          </h4>
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
  name: player.name,
  email: player.gravatarEmail,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
