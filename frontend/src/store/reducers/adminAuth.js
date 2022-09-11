const initialState = {
    token: '' || localStorage.token,
    isAuthenticated: false || localStorage.isAuthenticated,
    rank:'' || localStorage.rank,
    id: '' || localStorage.id,
    name: '' || localStorage.name
}

const adminAuthReducer = (state = initialState, action) => {
    if(action.type === 'ADMIN_AUTHENTICATION'){
        return {
            token: action.payload.token,
            isAuthenticated: true,
            rank: action.payload.rank,
            id: action.payload.id,
            name: action.payload.name
        }
    }
    return state
}


export default adminAuthReducer