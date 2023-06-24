import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleRedirect() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          data-testid="btn-go-home"
          onClick={ () => this.handleRedirect() }
        >
          Play Again
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
};

export default connect(mapStateToProps)(Ranking);
