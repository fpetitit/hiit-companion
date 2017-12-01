import initialState from './initialState';

import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Welcome');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);

import { AppNavigator } from '../navigators/AppNavigator';

export default function nav(state, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
