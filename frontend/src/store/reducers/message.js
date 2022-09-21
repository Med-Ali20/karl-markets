const initialState = {
    messageText: '' || localStorage.messageText,
    showMessage: false || localStorage.showMessage
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_MESSAGE' :
            return {
                messageText: action.payload,
                showMessage: true
            }
        case 'HIDE_MESSAGE' :
            return {
                messageText: '',
                showMessage: false
            }
        default : 
            return state

    }
}

export default messageReducer