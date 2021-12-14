import { call, put, takeLatest, all } from 'redux-saga/effects'
import * as actions from './userAction'
import { getUserAPI, getUserIdAPI, deleteUserAPI, addUserAPI, editUserAPI, loginUserAPI, setTokenHeader } from '../api'

function* getListSaga() {
    try {
        const response = yield call(getUserAPI)
        yield put(actions.getUsers.getUsersSuccess(response.data))
    } catch(e) {
        console.log(e)
        yield put(actions.getUsers.getUsersFailure(e.message))
    }
}
export function* onGetList() {
    yield takeLatest(actions.getUsers.getUsersRequest, getListSaga)
}

function* onDeleteUserSaga(id){
    try{
        yield call(deleteUserAPI, id.payload)
        yield put(actions.deleteUser.deleteUserSuccess(id.payload))
    } catch(e){
        yield put(actions.deleteUser.deleteUserFailure(e.message))
    }
}
export function* onDelete(){
    yield takeLatest(actions.deleteUser.deleteUserRequest, onDeleteUserSaga)
}

function* onAddUserSaga({payload}){
    try{

        const response = yield call(addUserAPI, payload)
        console.log(response.data)
        yield put(actions.addUser.addUserSuccess(response.data.user))
    } catch(e){
        yield put(actions.addUser.addUserFailure(e.message))
    }
}

export function* onAdd(){
    yield takeLatest(actions.addUser.addUserRequest, onAddUserSaga)
}

function* onEditUserSaga({payload}){
    try{
        console.log(payload)
        const response = yield call(editUserAPI, payload)
        console.log(response.data)
        yield put(actions.editUser.editUserSuccess(response.data.user))
    } catch(e){
        yield put(actions.editUser.editUserFailure(e.message))
    }
}

export function* onEdit(){
    yield takeLatest(actions.editUser.editUserRequest, onEditUserSaga)
}

export function* onLoginSaga(action) {
    try {
        const response = yield call(loginUserAPI, action.payload)
        localStorage.setItem('accessToken', response.data.accessToken)
        // lấy access token từ local storage 
        // và ko thể truyền thẳng tới server router mà phải dùng middle ware
        if (localStorage['accessToken']) {
            yield call(setTokenHeader, localStorage['accessToken'])
        }
        const user = yield call(getUserIdAPI)
        console.log(user)
        yield put(actions.loginUser.loginUserSuccess({accessToken: response.data.accessToken, user: user.data.user}))
    } catch(e){
        yield put(actions.loginUser.loginUserFailure(e.message))
    }
}

export function* onLogin(){
    yield takeLatest(actions.loginUser.loginUserRequest, onLoginSaga)
}

export function* onloadUserSaga() {
    try {
        if (localStorage['accessToken']) {
            yield call(setTokenHeader, localStorage['accessToken'])
        }
        const user = yield call(getUserIdAPI)
        console.log(user)
        yield put(actions.loadUser.loadUserSuccess({user: user.data.user}))
    } catch(e){
        yield put(actions.loadUser.loadUserFailure(e.message))
    }
}

export function* onLoad(){
    yield takeLatest(actions.loadUser.loadUserRequest, onloadUserSaga)
}

export function* userSaga() {
    yield all([call(onGetList), call(onDelete), call(onAdd), call(onEdit), call(onLogin), call(onLoad)])
}