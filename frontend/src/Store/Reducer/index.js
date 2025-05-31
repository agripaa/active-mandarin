import { combineReducers } from 'redux'
import { LangReducer } from './LangReducer'
import { sponsorReducer } from './sponsorReducer'
import { lectureReducer } from './lectureReducer'
import { testimonyReducer } from './testimonyLecture'
import { postReducer } from './postReducer'
import { classReducer } from './classReducer'
import { faqReducer } from './faqReducer'
import { aboutReducer } from './aboutReducer'
import { loadingScreen } from './loading'

export default combineReducers({
    LangReducer,
    sponsorReducer,
    lectureReducer,
    testimonyReducer,
    postReducer,
    classReducer,
    faqReducer,
    aboutReducer,
    loadingScreen
})