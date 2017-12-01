import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const Welcome = ({ history, onResetTimer, goToHistoryScreen, goToTimerScreen, goToConfigScreen }) => (
    <View style={styles.container}>
      <Text h1>Bienvenue !</Text>
      <Button
        onPress={() => {onResetTimer(); goToTimerScreen();}}
        large
        iconRight={{name: 'chevron-right', type: 'octicon' }}
        title="Démarrer"
        buttonStyle={styles.buttons}
        backgroundColor="green"
      />
      <Button
        onPress={() => {goToHistoryScreen()}}
        large
        iconRight={{name: 'history', type: 'octicon' }}
        title="Historique"
        buttonStyle={styles.buttons}
      />
      <Button
        onPress={() => {goToConfigScreen();}}
        large
        iconRight={{name: 'settings', type: 'octicon' }}
        title="Paramètres"
        buttonStyle={styles.buttons}
      />
    </View>
)

Welcome.propTypes = {
  onResetTimer: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginBottom: 20,
    width: 300,
  },
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'Logout' }),
  goToTimerScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Timer' })),
  goToHistoryScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'History' })),
  goToConfigScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Config' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
