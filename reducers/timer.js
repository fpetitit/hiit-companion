import initialState from './initialState';

const EXERCISE_TIME = 20;
const REST_TIME = 10;
const NUMBER_OF_PHASES = 5;
const NUMBER_OF_SET = 3;
const REST_BETWEEN_SET = 10;

export const PHASES = {
  EXERCISE: 'exercise',
  REST: 'rest',
  REST_BETWEEN_SET: 'restBetweenSet',
}

export const decrement = (timer, config) => {
    const {
      currentPhase,
      remainingExerciseTime,
      remainingRestTime,
      remainingPhases,
      remainingSet,
      restBetweenSet,
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
      if (currentPhase === PHASES.REST) {
        if (remainingRestTime > 0) {
          return {
            ...timer,
            remainingRestTime: remainingRestTime - 1,
          }
        } else {
          // rest is ended
          if (remainingPhases > 1) {
            return {
              ...timer,
              currentPhase: 'exercise',
              remainingPhases: remainingPhases -1,
              remainingRestTime: config.remainingRestTime,
            }
          } else {
            // it was the last phase of the set => go to restBetweenSet
            return {
              ...timer,
              remainingPhases: 0,
              currentPhase: PHASES.REST_BETWEEN_SET,
              remainingSet: remainingSet,
              remainingRestTime: config.remainingRestTime,
            }
          }
        }
      } else {
        // currentPhase === PHASES.REST_BETWEEN_SET
        if (restBetweenSet > 0) {
          return {
            ...timer,
            restBetweenSet: restBetweenSet - 1,
          }
        } else {
           if (remainingSet > 1) {
             // restBetweenSet is ended and it was not the last set
             return {
               ...timer,
               currentPhase: 'exercise',
               remainingPhases: config.remainingPhases,
               remainingSet: remainingSet - 1,
               restBetweenSet: config.restBetweenSet,
             }
           } else {
             // it was the last set => finish
             return {
               ...timer,
               remainingSet: 0,
             }
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
