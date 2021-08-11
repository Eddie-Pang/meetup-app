

export const eventsReducer = (state, action) => {
    console.log(state);
    console.log(action.payLoad);
    switch (action.type) {
      case 'init':
        return { ...state, status: 'init' }
  
      case 'requesting':
        return { ...state, status: 'requesting' }
  
      case 'received':
        console.log(action.payLoad)
        return { status: 'received',errorMsg: null, attendees: action.payLoad }
  
      case 'error':
        return { status: 'error', errorMsg: action.payLoad }
  
      case 'save':
        console.log(state?.attendees)
        console.log(action.payLoad)
        if (!state?.attendees.some(i => i === action.payLoad))
          state?.attendees.push(action.payLoad)
        return { ...state }
  
      case 'unsave':
        return { ...state, attendees: state?.attendees.filter(i => i !== action.payLoad) }
  
      case 'dbError':
        return { ...state, dbError: action.payLoad }
  
      default:
        throw new Error('dispatch action not reconised')
    }
  }