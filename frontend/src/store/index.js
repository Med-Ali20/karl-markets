import adminAuth from './reducers/adminAuth'
import boughtItem from './reducers/boughtItem'
import userAuth from './reducers/userAuth'
import cart from './reducers/cart'
import message from './reducers/message'
import { createStore, combineReducers } from 'redux'


const reducer = combineReducers({
    cart,
    userAuth,
    boughtItem,
    adminAuth,
    message
})

export const store = createStore(reducer)



