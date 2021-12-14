import { all, fork } from 'redux-saga/effects'
import { userSaga } from './user/userSaga'
import { productSaga } from './product/productSaga'
import { cartSaga } from './cart/carSaga'

export function* rootSaga() {
    yield all([
        fork(productSaga),
        fork(userSaga),
        fork(cartSaga)
    ]) 
  }