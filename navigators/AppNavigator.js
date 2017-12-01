import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WelcomeScreen from '../containers/Welcome';
import TimerScreen from '../containers/Timer';
import HistoryScreen from '../containers/History';
import ConfigScreen from '../containers/Config';

export const AppNavigator = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerTitle: 'Accueil',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Timer: {
    screen: TimerScreen,
    navigationOptions: {
      headerTitle: 'Exercice',
    },
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      headerTitle: 'Historique',
    },
  },
  Config: {
    screen: ConfigScreen,
    navigationOptions: {
      headerTitle: 'Configuration',
      tabBarLabel: 'Config',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
