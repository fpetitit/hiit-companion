import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';

import WelcomeScreen from '../containers/Welcome';
import TimerScreen from '../containers/Timer';
import HistoryScreen from '../containers/History';
import ConfigScreen from '../containers/Config';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  en: {
    exercise: 'Exercise',
    homepage: 'Home',
    greeting: 'Hi!',
    history: 'History',
    parameters: 'Parameters',
    start: 'Start'
  },
  fr: {
    exercise: 'Exercise',
    homepage: 'Accueil',
    greeting: 'Bonjour!',
    history: 'Historique',
    parameters: 'Paramètres',
    start: 'Démarrer'
  }
}

export const AppNavigator = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerTitle: I18n.t('homepage'),
      tabBarLabel: I18n.t('homepage'),
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
      headerTitle: I18n.t('exercise'),
    },
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      headerTitle: I18n.t('history'),
    },
  },
  Config: {
    screen: ConfigScreen,
    navigationOptions: {
      headerTitle: I18n.t('parameters'),
      tabBarLabel: I18n.t('parameters'),
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
