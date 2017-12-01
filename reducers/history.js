/*const addToHistory = (numberOfSet) => {
  const newHistoryDays = this.state.history.days.concat({
    date: GetFormattedDate(),
    numberOfSet: numberOfSet,
  });
  const newHistory = {
    ...this.state.history,
    days: newHistoryDays,
  };
  console.log('TOTO', newHistory);
  this.setState({
    showTimer: false,
    history: newHistory,
  });
  AsyncStorage.setItem('@AsyncStorageExample:history', JSON.stringify(newHistory), error => {
    console.log('TITI', error);
  });
}*/

const GetFormattedDate = () => {
    var todayTime = new Date();
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
}

const history = (state = {}, action) => {
  switch (action.type) {
    case 'RESET_HISTORY':
      return {
        ...state,
        history: {
          days: [],
        },
      }
    case 'HISTORY_ADD':
      const newHistoryDays = state.days.concat({
        date: GetFormattedDate(),
        numberOfSet: action.getState().config.remainingSet,
      });
      return {
        ...state,
        days: newHistoryDays,
      };
    default:
      return state
  }
}

export default history;
