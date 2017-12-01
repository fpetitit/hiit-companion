import { connect } from 'react-redux'
import Config from '../components/Config'
import { resetConfig, setConfigKey } from '../actions';

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetConfigClick: () => {
      dispatch(resetConfig())
    },
    onSetConfig: (key, value) => {
      dispatch(setConfigKey(key,value));
    },
  }
}

const VisibleConfig = connect(
  mapStateToProps,
  mapDispatchToProps
)(Config)

export default VisibleConfig
