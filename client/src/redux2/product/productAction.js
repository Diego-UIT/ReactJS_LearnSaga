export const getList = (product) => (
    {
        type: 'GET_LIST',
        payload: product
    }
)

export const getListSuccess = (product) => (
    {
        type: 'GET_LIST_SUCCESS',
        payload: product
    }
)

export const getListFailed = (product) => (
    {
        type: 'GET_LIST_FAILED',
        payload: product
    }
)

export const deleteProduct = (id) => (
    {
        type: "DELETE",
        payload: id
    }
)
export const deleteProductSuccess = (id) => (
    {
        type: "DELETE_SUCCESS",
        payload: id
    }
)
export const deleteProductFailed = (id) => (
    {
        type: "DELETE_FAILED",
        payload: id
    }
)

export const addProduct = (product) => (
    {
        type: 'ADD',
        payload: product
    }
)

export const addProductSuccess = (product) => (
    {
        type: 'ADD_SUCCESS',
        payload: product
    }
)

export const addProductFailed = (product) => (
    {
        type: 'ADD_FAILED',
        payload: product
    }
)

export const editProduct = (product) => (
    {
        type: 'EDIT',
        payload: product
    }
)

export const editProductSuccess = (product) => (
    {
        type: 'EDIT_SUCCESS',
        payload: product
    }
)

export const editProductFailed = (product) => (
    {
        type: 'EDIT_FAILED',
        payload: product
    }
)