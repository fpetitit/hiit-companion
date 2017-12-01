import { connect } from 'react-redux'
import Timer from '../components/Timer'
import { decrementTimer, startTimer, pauseTimer, addToHistory } from '../actions';

const mapStateToProps = state => {
  return {
    config: state.config,
    timer: state.timer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDecrementTimer: () => {
      dispatch(decrementTimer())
    },
    onStartTimer: () => {
      dispatch(startTimer())
    },
    onPauseTimer: () => {
      dispatch(pauseTimer())
    },
    addToHistory: () => {
      dispatch(addToHistory())
    },
   }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default TimerContainer
