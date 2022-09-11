import adminAuth from './reducers/adminAuth'
import boughtItem from './reducers/boughtItem'
import userAuth from './reducers/userAuth'
import cart from './reducers/cart'
import { createStore, combineReducers } from 'redux'


const reducer = combineReducers({
    cart,
    userAuth,
    boughtItem,
    adminAuth
})

export const store = createStore(reducer)



