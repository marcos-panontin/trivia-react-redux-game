import { SAVE_EMAIL, SAVE_NAME, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
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
  default:
    return state;
  }
};

export default player;
