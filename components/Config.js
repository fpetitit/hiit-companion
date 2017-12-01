import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, AsyncStorage, TouchableHighlight, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const ConfigType = t.struct({
  remainingSet: t.Number,
  remainingPhases: t.Number,
  remainingExerciseTime: t.Number,
  remainingRestTime: t.Number,
  restBetweenSet: t.Number,
});

const options = {
  fields: {
    remainingSet: {
      label: 'Nombre de répétitions :'
    },
    remainingPhases: {
      label: 'Nombre de phases par répétition :'
    },
    remainingExerciseTime: {
      label: 'Durée d\'une phase'
    },
    remainingRestTime: {
      label: 'Repos entre chaque phase'
    },
    restBetweenSet: {
      label: 'Repos entre les répétitions'
    },
  }
};

class Config extends React.Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
     // call getValue() to get the values of the form
     const value = this.form.getValue();
     if (value) { // if validation fails, value will be null
       console.log(value); // value here is an instance of Person
       Object.keys(value).forEach(key => {
         this.props.onSetConfig(key, value[key]);
       })
     }
   }

  render() {

    const {
      config,
    } = this.props;

    const value = {
      remainingSet: config.remainingSet,
      remainingPhases: config.remainingPhases,
      remainingExerciseTime: config.remainingExerciseTime,
      remainingRestTime: config.remainingRestTime,
      restBetweenSet: config.restBetweenSet,
    };

    return <ScrollView style={styles.container}>
    <Text h2>Paramètres</Text>
    <Form
      options={options}
      ref={(form) => { this.form = form; }}
      type={ConfigType}
      value={value}
    />
    <TouchableHighlight onPress={this._onPressButton}>
      <View pointerEvents='none'>
        <Text>Save</Text>
      </View>
    </TouchableHighlight>
  </ScrollView>;}
};

Config.propTypes = {
  config: PropTypes.object.isRequired,
  onResetConfigClick: PropTypes.func.isRequired,
  onSetConfig: PropTypes.func.isRequired,
}

export default Config;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttons: {
    marginBottom: 18,
    width: 300,
  },
});
