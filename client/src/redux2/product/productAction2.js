import {createActions} from 'redux-actions'

export const getProducts = createActions({
    getProductsRequest: undefined,
    getProductsSuccess:(payload) => payload,
    getProductsFailure:(err) => err
})

export const addProduct = createActions({
    addProductRequest: (payload) => payload,
    addProductSuccess:(payload) => payload,
    addProductFailure:(err) => err
})

export const editProduct = createActions({
    editProductRequest: (payload) => payload,
    editProductSuccess:(payload) => payload,
    editProductFailure:(err) => err
})

export const deleteProduct = createActions({
    deleteProductRequest: (payload) => payload,
    deleteProductSuccess:(payload) => payload,
    deleteProductFailure:(err) => err
})