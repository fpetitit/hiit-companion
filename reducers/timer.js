import initialState from './initialState';

const EXERCISE_TIME = 20;
const REST_TIME = 10;
const NUMBER_OF_PHASES = 5;
const NUMBER_OF_SET = 3;
const REST_BETWEEN_SET = 10;

const decrement = (timer, config) => {
    const {
      currentPhase,
      remainingExerciseTime,
      remainingRestTime,
      remainingPhases,
      remainingSet,
    } = timer;
    if (currentPhase === 'exercise') {
      if (remainingExerciseTime > 0) {
        return {
          ...timer,
          remainingExerciseTime: remainingExerciseTime - 1,
        }
      } else {
        return {
          ...timer,
          currentPhase: 'rest',
          remainingExerciseTime: config.remainingExerciseTime,
        }
      }
    } else {
      if (remainingRestTime > 0) {
        return {
          ...timer,
          remainingRestTime: remainingRestTime - 1,
        }
      } else {
        if (remainingPhases > 1) {
          return {
            ...timer,
            currentPhase: 'exercise',
            remainingPhases: remainingPhases -1,
            remainingRestTime: config.remainingRestTime,
          }
        } else {
          return {
            ...timer,
            currentPhase: 'exercise',
            remainingPhases: config.remainingPhases,
            remainingSet: remainingSet -1,
            remainingRestTime: config.remainingRestTime,
          }
        }
      }
    }
};

const timer = (state = initialState.timer, action) => {
  switch (action.type) {
    case 'DECREMENT_TIMER': {
      if (state.status === 'started') {
        const newTimer = decrement(state, action.getState().config);
        console.log(newTimer)
        return {
          ...newTimer,
        }
      }
      return state;
    }
    case 'TIMER_START': {
      console.log("START AND DECREMENT")
      const newTimer = decrement(state);
      return {
        ...newTimer,
        status: 'started',
      }
    }
    case 'TIMER_PAUSE': {
      return {
        ...state,
        status: 'paused',
      }
    }
    case 'TIMER_RESET': {
      return {
        ...action.getState().config,
        status: 'stopped',
      }
    }
    default:
      return state
  }
}

export default timer;
