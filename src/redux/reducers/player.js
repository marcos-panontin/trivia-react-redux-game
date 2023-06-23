import {
  GENERATE_RANDOM_INDEX, PUSH_ANSWERS_TO_GLOBAL_STATE,
  SAVE_EMAIL, SAVE_NAME, SAVE_SCORE,
}
  from '../actions/actionsName';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  correctAnswerIndex: 0,
  allAnswersLength: 0,
};

const player = (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  case GENERATE_RANDOM_INDEX:
    return {
      ...state,
      correctAnswerIndex: Math.floor(Math.random() * state.allAnswersLength) + 1,
    };
  case PUSH_ANSWERS_TO_GLOBAL_STATE:
    return {
      ...state,
      allAnswersLength: action.payload && action.payload.incorrect_answers.length + 1,
    };
  default:
    return state;
  }
};

export default player;
