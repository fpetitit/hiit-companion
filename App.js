import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import VisibleHistory from './containers/History';
import Timer from './containers/Timer';
import Welcome from './containers/Welcome';
import { PersistGate } from 'redux-persist/es/integration/react'
//import reducers from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import { AppRegistry } from 'react-native';
import initialState from './reducers/initialState';

import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import reducers from './reducers' // where reducers is an object of reducers

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)

const addStoreToActionPayload = store => next => action => {
  next({ ...action, getState: store.getState });
}

//function configureStore () {
  // ...
  let store = createStore(reducer, initialState, applyMiddleware(addStoreToActionPayload));
  let persistor = persistStore(store)

  //return { persistor, store }
//}


//let store = createStore(reducers, initialState, applyMiddleware(addStoreToActionPayload));
/*
const GetFormattedDate = () => {
    var todayTime = new Date();
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
}
*/
class App extends React.Component {
  /*async getCache(key){
      try{
          let value = await AsyncStorage.getItem(key);
          console.log(key, value);
          if (value === null || value === undefined) {
            console.log('value is null')
            return null;
          }
          console.log('value : ', value);
          return value;
      }
      catch(e){
          console.log('caught error', e);
          // Handle exceptions
      }
  }*/

  /*constructor(props) {
    super(props);
    this.state = {
      showHistorique: false,
      showTimer: false,
      timer: {},
      history: {},
      config: {},
    };
    this.getCache('@AsyncStorageExample:history').then(history => {
      let historyObj;
      try {
        historyObj = JSON.parse(history);
      } catch (e) {
        historyObj = { days: []};
      }
      console.log('history is ', history);
      if (historyObj === null || historyObj.days === undefined) {
        this.setState({
          history: { days: [] },
        });
      } else {
        this.setState({
          history: historyObj,
        });
      }
    });
    this.getCache('@AsyncStorageExample:config').then(config => {
      console.log('config = ', config);
      if (config === null) {
        console.log('no config found, initialize it with data', JSON.stringify(initialTimer));
        this.setState({
          config: initialTimer,
        });
        AsyncStorage.setItem('@AsyncStorageExample:config', JSON.stringify(initialTimer), error => {
            console.log('Error during save of config', error);
        });
      } else {
        console.log('config is ', config);
        this.setState({
          config: JSON.parse(config),
        });
      }
    });
  }*/

  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </PersistGate>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;

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
