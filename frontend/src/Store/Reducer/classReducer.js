import { Types } from "../Constants/Type"

const initialState = {
    classes: []
}

export const classReducer = ( state = initialState, action ) => {
    const { type, payload } = action
    switch(type){
        case Types.GET_CLASS_SUCCESS:
            return{
                ...state,
                classes: payload
            }
        case Types.GET_CLASS:
        case Types.GET_CLASS_FAILED:
        default:
            return state
    }
}