import { connect } from 'react-redux'
import Welcome from '../components/Welcome'
import { resetTimer } from '../actions';

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetTimer: () => {
      dispatch(resetTimer())
    }
  }
}

const WelcomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)

export default WelcomeContainer
