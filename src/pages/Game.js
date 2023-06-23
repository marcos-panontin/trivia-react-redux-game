import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import GameSection from '../components/GameSection';

class Game extends Component {
  state = {
    results: [{ correct_answer: '', incorrect_answers: [], category: '', question: '' }],
    index: 0,
    loading: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    const results = await getQuestions();
    this.setState({ results: results.results, loading: false });
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
    const { results, index, loading } = this.state;
    return (
      <>
        <Header />
        { !loading && <GameSection questionInfo={ results[index] } /> }
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
