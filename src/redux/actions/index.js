import {
  SAVE_EMAIL, SAVE_NAME, SAVE_SCORE, GENERATE_RANDOM_INDEX,
  PUSH_ANSWERS_TO_GLOBAL_STATE,
} from './actionsName';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveName = (name) => ({
  type: SAVE_NAME,
  name,
});

export const saveScore = (score, assertions) => ({
  type: SAVE_SCORE,
  score,
  assertions,
});

export const generateRandomIndex = () => ({
  type: GENERATE_RANDOM_INDEX,
});

export const pushAnswersToGlobalState = (results) => ({
  type: PUSH_ANSWERS_TO_GLOBAL_STATE,
  payload: results,
});
