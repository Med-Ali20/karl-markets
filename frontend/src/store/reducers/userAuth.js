const inititalState = {
    userName:'' || localStorage.userName,
    email: '' || localStorage.email,
    id:'' || localStorage.id,
    token: '' || localStorage.token,
    isAuthenticated: false || localStorage.isUserAuthenticated
}

const userAuthReducer = (state=inititalState, action) => {
    if(action.type === 'USER_AUTHENTICATION'){
        return {
            userName: action.payload.userName,
            email: action.payload.email,
            id: action.payload.id,
            token: action.payload.token,
            isAuthenticated: true
        }
    }
    return state
}


export default userAuthReducer