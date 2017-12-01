import initialState from './initialState';

/*
const updateConfigKey = (key, value) => {
  console.log('update to ', key, value);
  const newConfig = this.state.config;
  newConfig[key] = value;
  this.setState({ newConfig });
  AsyncStorage.setItem('@AsyncStorageExample:config', JSON.stringify(newConfig), error => {});
}
*/
const config = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_CONFIG':
      return {
        ...initialTimer
      }
    case 'SET_CONFIG_KEY':
      const updatedPart = {};
      const newValue = action.element.value;
      updatedPart[action.element.key] = newValue;
      return {
        ...state,
        ...updatedPart,
      };
    default:
      return state
  }
}

export default config;
