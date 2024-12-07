import { all } from 'redux-saga/effects'
import { watchListGet } from './getHandles'

export default function* rootSaga(){
    yield all([
        watchListGet()
    ])
}