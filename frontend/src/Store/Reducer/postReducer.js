import { Types } from "../Constants/Type"

const initialState = {
    post: []
}

export const postReducer = ( state = initialState, action ) => {
    const { type, payload } = action
    switch(type){
        case Types.GET_POST_SUCCESS:
            return{
                ...state,
                post: payload
            }
        case Types.GET_POST_FAILED:
        case Types.GET_POST:
        default:
            return state
    }
}