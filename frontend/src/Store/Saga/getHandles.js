import { takeEvery, put, all } from 'redux-saga/effects'
import axios from 'axios'
import { API } from '../Config/HttpCommon'
import { Types } from '../Constants/Type'
import { LangType } from '../Constants/LangType'

function* handleGetSponsors(){
    try {
        const res = yield axios(API('get', 'sponsors/list-sponsors'))
        yield put({ type: Types.GET_SPONSORS_SUCCESS, payload: res.data })
    } catch (e) {
        yield put({ type: Types.GET_SPONSORS_FAILED })
    }
}

function* handleGetLectures(){
    try {
        const res = yield axios(API('get', 'mentor/list-mentor'))
        yield put({ type: Types.GET_LECTURE_SUCCESS, payload: res.data })
    } catch (e) {
        yield put({ type: Types.GET_LECTURE_FAILED })
    }
}

function* handleGetTestimony(){
    try {
        const res = yield axios(API('get', 'feedback/list-feedback'))
        yield put({ type: Types.GET_TESTIMONY_SUCCESS, payload: res.data })
    } catch (e) {
        yield put({ type: Types.GET_TESTIMONY_FAILED })
    }
}

function* handleGetPost(){
    try {
        const res = yield axios(API('get', 'posting/list-posting'))
        yield put({ type: Types.GET_POST_SUCCESS, payload: res.data})
    } catch (e) {
        yield put({ type: Types.GET_POST_FAILED })
    }
}

function* handleGetClass(action){
    const { payload } = action
    const limit = payload?.limit ? `limit=${payload.limit}` : ''
    const page = payload?.page ? `&page=${payload.page}` : ''
    const search = payload?.search ? `search=${payload.search}` : ''
    try {
        const res = yield axios(API('get', `groupclass/list-group-class${payload && '?'}${limit}${page}${search}`))
        yield put({ type: Types.GET_CLASS_SUCCESS, payload: res.data })
    } catch (e) {
        yield put({ type: Types.GET_CLASS_FAILED })
    }
}

export function* handleGetFaq(){
    try {
        const res = yield axios(API('get', 'faq/list-faq'))
        yield put({ type: Types.GET_FAQ_SUCCESS, payload: res.data })
    } catch (e) {
        yield put({ type: Types.GET_FAQ_FAILED })
    }
}

export function* handleGetAbout(action){
    const { payload } = action
    try {
        const res = yield axios(API('get', `about/list-about?search=${payload}`))
        yield put({ type: Types.GET_ABOUT_SUCCESS, payload: res.data })
    } catch (e) {
        yield put({ type: Types.GET_ABOUT_FAILED })
    }
}

export function* handleGetLanguage(){
    try {
        yield put({ type: Types.ONLOAD })
        const res = yield axios(API('get', 'lang/list-lang'))
        yield put({ type: Types.ONLOAD_DONE })
        yield put({ type: LangType.GET_LANG_SUCCESS, payload: res.data[0] })
    } catch (e) {
        yield put({ type: LangType.GET_LANG_FAILED })
    }
}

export function* watchListGet(){
    yield all([
        yield takeEvery(Types.GET_SPONSORS, handleGetSponsors),
        yield takeEvery(Types.GET_LECTURE, handleGetLectures),
        yield takeEvery(Types.GET_TESTIMONY, handleGetTestimony),
        yield takeEvery(Types.GET_POST, handleGetPost),
        yield takeEvery(Types.GET_CLASS, handleGetClass),
        yield takeEvery(Types.GET_FAQ, handleGetFaq),
        yield takeEvery(Types.GET_ABOUT, handleGetAbout),
        yield takeEvery(LangType.GET_LANG, handleGetLanguage)
    ])
}