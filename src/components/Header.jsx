import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateGravatarURL } from '../services/gravatarFunctions';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header className="header">
        <img
          src={ generateGravatarURL(gravatarEmail) }
          alt="avatar"
          data-testid="header-profile-picture"
          className="avatar"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h5 data-testid="header-score">SCORE: {score}</h5>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
