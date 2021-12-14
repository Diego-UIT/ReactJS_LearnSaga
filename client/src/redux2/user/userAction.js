import {createActions} from 'redux-actions'

export const getUsers = createActions({
    getUsersRequest: undefined,
    getUsersSuccess:(payload) => payload,
    getUsersFailure:(err) => err
})

export const addUser = createActions({
    addUserRequest: (payload) => payload,
    addUserSuccess:(payload) => payload,
    addUserFailure:(err) => err
})

export const loginUser = createActions({
    loginUserRequest: (payload) => payload,
    loginUserSuccess:(payload) => payload,
    loginUserFailure:(err) => err
})


export const editUser = createActions({
    editUserRequest: (payload) => payload,
    editUserSuccess:(payload) => payload,
    editUserFailure:(err) => err
})

export const deleteUser = createActions({
    deleteUserRequest: (payload) => payload,
    deleteUserSuccess:(payload) => payload,
    deleteUserFailure:(err) => err
})

export const loadUser = createActions({
    loadUserRequest: undefined,
    loadUserSuccess:(payload) => payload,
    loadUserFailure:(err) => err
})

export const logoutUser = createActions({
    logoutUserRequest: undefined,
    logoutUserSuccess:(payload) => payload,
    loadUserFailure:(err) => err
})