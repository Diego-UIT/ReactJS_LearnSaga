import { getCart, addCart } from './cartAction'

const initState = {
    products: [],
    total: 0
}

const cartReducer = (state = initState, action) => {
    switch(action.type) {
        case getCart.getCartRequest().type:
        case getCart.getCartFailure().type:
        case addCart.addCartRequest().type:
        case addCart.addCartFailure().type:
            return state   
        case getCart.getCartSuccess().type:
            console.log(action.payload)
            return {...state, products: action.payload.cart}
        case addCart.addCartSuccess().type:
            console.log("reducer add success!")
            console.log(action.payload)
            return {...state, products: action.payload.cart.cart}
        default:
            return state
    }
}

export default cartReducer