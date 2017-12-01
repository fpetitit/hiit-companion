export const resetHistory = () => {
  return {
    type: 'RESET_HISTORY'
  }
}

export const addToHistory = () => {
  return {
    type: 'HISTORY_ADD',
  }
}

export const resetTimer = () => {
  return {
    type: 'TIMER_RESET',
  }
}

export const decrementTimer = () => {
  return {
    type: 'DECREMENT_TIMER',
  }
}

export const startTimer = () => {
  return {
    type: 'TIMER_START',
  }
}

export const pauseTimer = () => {
  return {
    type: 'TIMER_PAUSE',
  }
}

export const setConfigKey = (key, value) => {
  return {
    type: 'SET_CONFIG_KEY',
    element: { key, value },
  }
}
