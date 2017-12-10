import { PHASES, decrement } from '../timer.js'

describe('timer', () => {
  const config = {
    remainingExerciseTime: 20,
    remainingRestTime: 10,
    remainingPhases: 5,
    remainingSet: 3,
    restBetweenSet: 60,
  };

  [{
    timer: {
      currentPhase: PHASES.REST,
      remainingExerciseTime: 20,
      remainingRestTime: 10,
      remainingPhases: 1,
      remainingSet: 2,
      restBetweenSet: 60,
    },
    expected: {
      currentPhase: PHASES.REST,
      remainingExerciseTime: 20,
      remainingRestTime: 9,
      remainingPhases: 1,
      remainingSet: 2,
      restBetweenSet: 60,
    },
  }].forEach(function({ timer, expected }) {
    it('should update the state', () => {
      expect(decrement(timer, config)).toEqual(expected);
    });
  });
})
