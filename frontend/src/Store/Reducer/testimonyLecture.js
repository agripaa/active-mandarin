import { Types } from "../Constants/Type"

const initialState = {
    testimony: []
}

export const testimonyReducer = ( state = initialState, action ) => {
    const { type, payload } = action
    switch(type){
        case Types.GET_TESTIMONY_SUCCESS:
            return{
                ...state,
                testimony: payload
            }
        case Types.GET_TESTIMONY_FAILED:
        case Types.GET_TESTIMONY:
        default:
            return state
    }
}