import { call, put, takeLatest, all } from 'redux-saga/effects'
import * as actions from './cartAction'
import { getCartAPI, addCartAPI, editCartAPI } from '../api'

function* getListSaga() {
    try {
        const response = yield call(getCartAPI)
        yield put(actions.getCart.getCartSuccess(response.data))
    } catch(e) {
        console.log(e)
        yield put(actions.getCart.getCartFailure(e.message))
    }
}
export function* onGetList() {
    yield takeLatest(actions.getCart.getCartRequest, getListSaga)
}

function* onAddSaga({payload}) {
    try {
        console.log(payload)
        const response = yield call(getCartAPI, payload.userId)
        console.log(response.data)
        let res
        if (response.data.cart) {
            console.log("cart1")
            res = yield call(editCartAPI, response.data.cart._id, payload)
            console.log(res)
        } 
        else {
            console.log("cart2")
            res = yield call(addCartAPI, payload)
            console.log(res)
        }
        yield put(actions.addCart.addCartSuccess(res.data))
    } catch(e) {
        console.log(e)
        yield put(actions.addCart.addCartFailure(e.message))
    }
}
export function* onAdd() {
    yield takeLatest(actions.addCart.addCartRequest, onAddSaga)
}

export function* cartSaga() {
    yield all([call(onGetList), call(onAdd)])
}