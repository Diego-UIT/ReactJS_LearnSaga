import {createActions} from 'redux-actions'

export const getCart = createActions({
    getCartRequest: undefined,
    getCartSuccess:(payload) => payload,
    getCartFailure:(err) => err
})

export const addCart = createActions({
    addCartRequest: (payload) => payload,
    addCartSuccess:(payload) => payload,
    addCartFailure:(err) => err
})

export const editCart = createActions({
    editCartRequest: (payload) => payload,
    editCartSuccess:(payload) => payload,
    editCartFailure:(err) => err
})

export const deleteCart = createActions({
    deleteCartRequest: (payload) => payload,
    deleteCartSuccess:(payload) => payload,
    deleteCartFailure:(err) => err
})

