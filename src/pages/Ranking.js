import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <p data-testid="ranking-title">Ranking</p>
    );
  }
}

export default connect(mapStateToProps)(Ranking);
