import { Types } from "../Constants/Type"

const initialState = {
    faq: []
}

export const faqReducer = ( state = initialState, action ) => {
    const { type, payload } = action
    switch(type){
        case Types.GET_FAQ_SUCCESS:
            return{
                ...state,
                faq: payload
            }
        case Types.GET_FAQ_FAILED:
        case Types.GET_FAQ:
        default:
            return state
    }
}