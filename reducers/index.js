import { combineReducers } from 'redux'
import history from './history'
import timer from './timer'
import nav from './navigation'
import config from './config'

const hiitApp = {
  history,
  timer,
  nav,
  config,
}

export default hiitApp
