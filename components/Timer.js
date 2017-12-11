import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as Progress from 'react-native-progress';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this._decrementTimer = this._decrementTimer.bind(this);
  }

  _decrementTimer() {
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    setTimeout(this.props.onDecrementTimer, 1000);
    var Sound = require('react-native-sound');

    // Enable playback in silence mode
    Sound.setCategory('Playback');
    if (this.props.timer.remainingExerciseTime === 0 || this.props.timer.remainingRestTime === 0) {
      var woosh = new Sound('sound0899.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log('duration in seconds: ' + woosh.getDuration() + 'number of channels: ' + woosh.getNumberOfChannels());
        woosh.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            woosh.release();
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
    } else {
      /*var woosh = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log('duration in seconds: ' + woosh.getDuration() + 'number of channels: ' + woosh.getNumberOfChannels());
        woosh.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            woosh.release();
          } else {
            console.log('playback failed due to audio decoding errors');
            //whoosh.release();
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            // Release the audio player resource
            //woosh.reset();
          }
        });
      });*/
    }
  }
  render () {
    const {
      addToHistory,
      config,
      onDecrementTimer,
      onPauseTimer,
      onStartTimer,
      timer,
    } = this.props;

    let timeToShow;
    if (timer.currentPhase === 'exercise') {
      timeToShow = timer.remainingExerciseTime;
    } else {
      if (timer.currentPhase === 'rest') {
        timeToShow = timer.remainingRestTime;
      } else {
        timeToShow = timer.restBetweenSet;
      }
    };
    let progress;
    if (timer.currentPhase === 'exercise') {
      progress = timeToShow / config.remainingExerciseTime;
    } else {
      if (timer.currentPhase === 'rest') {
        progress = timeToShow / config.remainingRestTime;
      } else {
        progress = timeToShow / config.restBetweenSet;
      }
    };
    let pieColor;
    if (timer.currentPhase === 'exercise') {
      pieColor = '#5bb81d';
    } else {
      if (timer.currentPhase === 'rest') {
        pieColor = '#b87a1d';
      } else {
        pieColor = '#1db87a';
      }
    };
    this._decrementTimer();
    return <View style={styles.container}>
      { timer.remainingSet === 0 && <Text>Bravo ! :-)</Text>}
      { timer.remainingSet === 0 && <Button onPress={addToHistory} title="Ajouter à l'historique" />}

      { timer.remainingSet !== 0 && <Text>Phase : {timer.currentPhase}</Text>}
      { timer.remainingSet !== 0 && <Text>Nombre de phases restantes : {timer.remainingPhases} / {config.remainingPhases}</Text>}
      { timer.remainingSet !== 0 && <Text>Nombre de set restant : {timer.remainingSet} / {config.remainingSet}</Text>}
      { timer.remainingSet !== 0 && <Text>Temps restant :</Text>}
      { timer.remainingSet !== 0 && <Text
        style={styles.countDownValue}
        >{timeToShow}</Text>}
      { timer.remainingSet !== 0 && <Progress.Pie
        color={pieColor}
        progress={progress}
        size={100}
        style={styles.pie}
      />}
      { timer.remainingSet !== 0 && <Button
        onPress={onStartTimer}
        buttonStyle={styles.buttons}
        title="Démarrer"
        backgroundColor="green"
      />}
      { timer.remainingSet !== 0 && <Button
        onPress={onPauseTimer}
        buttonStyle={styles.buttons}
        title="Pause"
        iconRight={{name: 'control-pause', type: 'simple-line-icon' }}
      />}
    </View>
  }
}

Timer.propTypes = {
  config: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired,
  onDecrementTimer: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired
}

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
  pie: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    width: 300,
  },
  countDownValue: {
    fontSize: 60,
  },
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  goToWelcomeScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Welcome' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
