import { call, put, takeLatest, all } from 'redux-saga/effects'
import * as actions from './productAction2'
import { getProductAPI, deleteProductAPI, addProductAPI, editProductAPI } from '../api'

function* getListSaga() {
    try {
        const response = yield call(getProductAPI)
        yield put(actions.getProducts.getProductsSuccess(response.data))
    } catch(e) {
        console.log(e)
        yield put(actions.getProducts.getProductsFailure(e.message))
    }
}
export function* onGetList() {
    yield takeLatest(actions.getProducts.getProductsRequest, getListSaga)
}

function* onDeleteProductSaga(id){
    try{
        yield call(deleteProductAPI, id.payload)
        yield put(actions.deleteProduct.deleteProductSuccess(id.payload))
    } catch(e){
        yield put(actions.deleteProduct.deleteProductFailure(e.message))
    }
}
export function* onDelete(){
    yield takeLatest(actions.deleteProduct.deleteProductRequest, onDeleteProductSaga)
}

function* onAddProductSaga({payload}){
    try{
        const response = yield call(addProductAPI, payload)
        yield put(actions.addProduct.addProductSuccess(response.data))
    } catch(e){
        yield put(actions.addProduct.addProductFailure(e.message))
    }
}

export function* onAdd(){
    yield takeLatest(actions.addProduct.addProductRequest, onAddProductSaga)
}

function* onEditProductSaga({payload}){
    try{
        const response = yield call(editProductAPI, payload)
        console.log(response.data)
        yield put(actions.editProduct.editProductSuccess(response.data.product))
    } catch(e){
        yield put(actions.editProduct.editProductFailure(e.message))
    }
}

export function* onEdit(){
    yield takeLatest(actions.editProduct.editProductRequest, onEditProductSaga)
}

export function* productSaga() {
    yield all([call(onGetList), call(onDelete), call(onAdd), call(onEdit)])
}