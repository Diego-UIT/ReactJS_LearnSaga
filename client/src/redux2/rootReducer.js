import {combineReducers} from 'redux'
import productReducer from './product/productReducer'
import userReducer from './user/userReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
    products: productReducer,
    users: userReducer,
    carts: cartReducer
})

export default rootReducer