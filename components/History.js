import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const History = ({ history, onResetHistoryClick, goToWelcomeScreen }) => (
  <View style={styles.container}>
    <Text>History</Text>
    {history.days && history.days.map(day => {
      return <Text
        key={day.date}
      > Date : {day.date} - # of sets {day.numberOfSet}</Text>;
    })}
    {!history.days && <Text>Empty history</Text>}
  </View>
)

History.propTypes = {
  history: PropTypes.object.isRequired,
  onResetHistoryClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  goToWelcomeScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Welcome' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginBottom: 18,
    width: 300,
  },
});
