import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import GameSection from '../components/GameSection';

class Game extends Component {
  state = {
    results: [],
    index: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const results = await getQuestions();
    this.setState({ results: results.results });
    const magicNum = 3;
    if (results.response_code === magicNum) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  handleClick = () => {
    const { results, index } = this.state;
    const { history } = this.props;
    if (index === results.length - 1) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }
  };

  render() {
    const { results, index } = this.state;
    return (
      <>
        <Header />
        <GameSection questionInfo={ results[index] } />
        <button onClick={ this.handleClick }>Next</button>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
