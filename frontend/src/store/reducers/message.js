const initialState = {
    messageText: '' || localStorage.messageText,
    showMessage: false || localStorage.showMessage,
    isLoading: false
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_MESSAGE' :
            return {
                ...state,
                messageText: action.payload,
                showMessage: true
            }
        case 'HIDE_MESSAGE' :
            return {
                ...state,
                messageText: '',
                showMessage: false
            }
        case 'SET_LOADING' : 
            return {
                ...state,
                isLoading: true
            }
        case 'DISABLE_LOADING' : 
            return {
                ...state,
                isLoading: false
            }
        default : 
            return state

    }
}

export default messageReducer