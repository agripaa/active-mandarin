import { Types } from "../Constants/Type"

const initialState = {
    about: {}
}

export const aboutReducer = ( state = initialState, action ) => {
    const { type, payload } = action
    switch(type){
        case Types.GET_ABOUT_SUCCESS:
            return{
                ...state,
                about: payload[0]
            }
        case Types.GET_ABOUT:
        case Types.GET_ABOUT_FAILED:
        default:
            return state
    }
}