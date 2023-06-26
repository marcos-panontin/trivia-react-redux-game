import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import GameSection from '../components/GameSection';
import {
  restartTimer,
  disableAlternatives, enableAlternativesButtons,
} from '../redux/actions';

class Game extends Component {
  state = {
    results: [{
      correct_answer: '',
      incorrect_answers: [],
      category: '',
      question: '',
      difficulty: '' }],
    index: 0,
    loading: false,
    seconds: 30,
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

    this.startTimer();
  }

  componentDidUpdate() {
    const { clearTimer } = this.props;

    if (clearTimer) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    const { dispatch } = this.props;
    const second = 1000;
    this.timer = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({
          seconds: seconds - 1,
        });
      } else {
        clearInterval(this.timer);
        dispatch(disableAlternatives());
      }
    }, second);
  };

  handleClick = () => {
    const { results, index } = this.state;
    const { history, dispatch } = this.props;

    // DEALING WITH THE TIMER

    dispatch(restartTimer());
    this.setState({
      seconds: 30,
    });
    clearInterval(this.timer);
    this.startTimer();

    if (index === results.length - 1) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }

    // ENABLING BUTTONS
    dispatch(enableAlternativesButtons());
  };

  render() {
    const { results, index, loading, seconds } = this.state;
    const { clearTimer } = this.props;
    return (
      <>
        <Header />
        { !loading && <GameSection
          questionInfo={ results[index] }
          seconds={ seconds }
        />}
        {(clearTimer || seconds === 0) && (
          <button
            data-testid="btn-next"
            onClick={ this.handleClick }
          >
            Next
          </button>
        )}
        <p data-testid="timer">{seconds}</p>
      </>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  clearTimer: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  clearTimer: player.clearTimer,
});

export default connect(mapStateToProps)(Game);
