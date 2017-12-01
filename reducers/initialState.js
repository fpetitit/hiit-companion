import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

const EXERCISE_TIME = 20;
const REST_TIME = 10;
const NUMBER_OF_PHASES = 5;
const NUMBER_OF_SET = 3;
const REST_BETWEEN_SET = 10;
const initialTimer = {
  remainingSet: NUMBER_OF_SET,
  remainingPhases: NUMBER_OF_PHASES,
  remainingExerciseTime: EXERCISE_TIME,
  remainingRestTime: REST_TIME,
  restBetweenSet: REST_BETWEEN_SET,
  currentPhase: 'exercise',
};

export default initialState = {
  config: {
    ...initialTimer,
  },
  timer: {
    ...initialTimer,
    status: 'stopped',
  },
  history: {
    days: [],
  }
}
