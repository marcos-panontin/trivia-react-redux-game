import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import GameSection from '../components/GameSection';
import { pushAnswersToGlobalState, generateRandomIndex } from '../redux/actions';

class Game extends Component {
  state = {
    results: [{ correct_answer: '', incorrect_answers: [], category: '', question: '' }],
    index: 0,
    loading: false,
  };

  async componentDidMount() {
    const { history, dispatch } = this.props;
    const { index } = this.state;
    this.setState({
      loading: true,
    });
    const results = await getQuestions();
    this.setState({ results: results.results, loading: false });
    dispatch(pushAnswersToGlobalState(results.results[index]));
    dispatch(generateRandomIndex());
    const magicNum = 3;
    if (results.response_code === magicNum) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  handleClick = () => {
    const { results, index } = this.state;
    const { history, dispatch } = this.props;
    if (index === results.length - 1) {
      history.push('/feedback');
    } else {
      dispatch(generateRandomIndex());
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
