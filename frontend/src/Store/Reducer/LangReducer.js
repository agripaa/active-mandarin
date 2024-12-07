import { LangType } from "../Constants/LangType";

const initialState = {
    data: [],
    langs: true
}

export const LangReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case LangType.GET_LANG_SUCCESS:
            return{
                ...state,
                data: payload
            }
        case LangType.CHANGE_LANG:
            return{
                ...state,
                langs: payload
            }
        case LangType.GET_LANG_FAILED:
        case LangType.GET_LANG:
        default:
            return state
    }
}