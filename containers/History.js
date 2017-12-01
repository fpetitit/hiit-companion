import { connect } from 'react-redux'
import History from '../components/History'
import { resetHistory } from '../actions';

const mapStateToProps = state => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetHistoryClick: () => {
      dispatch(resetHistory())
    }
  }
}

const VisibleHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(History)

export default VisibleHistory
