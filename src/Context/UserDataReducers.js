

export const eventsReducer = (state, action) => {
    // console.log(state);
    // console.log(action.payLoad);
    switch (action.type) {
      case 'init':
        return { ...state, status: 'init' }
  
      case 'requesting':
        return { ...state, status: 'requesting' }
  
      case 'received':
        return { status: 'received',errorMsg: null, events: action.payLoad }
  
      case 'error':
        return { status: 'error', errorMsg: action.payLoad }
  
      case 'save':
        if (!state.events.some(i => i._id === action.payLoad._id))
          state.events.push(action.payLoad)
        return { ...state }
  
      case 'unsave':
        return { ...state, events: state.events.filter(i => i._id !== action.payLoad._id) }
  
      case 'dbError':
        return { ...state, dbError: action.payLoad }
  
      default:
        throw new Error('dispatch action not reconised')
    }
  }