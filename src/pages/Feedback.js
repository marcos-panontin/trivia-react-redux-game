import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { score, name } = this.props;
    return (
      <>

        <p>Feedback</p>
        <img data-testid="header-profile-picture" alt="Player Avatar" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ score }</p>

      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  score: globalState.score,
  name: globalState.name,
});

export default connect(mapStateToProps)(Feedback);
