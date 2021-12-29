const defaultState = {
  dataLoaded: false,
  filters: { showFun: true, showDifficulty: true },
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...defaultState, dataLoaded: true }
    case 'CHANGE_FILTERS':
      return {
        ...state,
        filters: {
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default app
