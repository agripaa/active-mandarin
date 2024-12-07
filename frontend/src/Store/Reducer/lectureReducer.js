import { Types } from "../Constants/Type"

const initialState = {
    lecture: [],
    loadings: false
}

export const lectureReducer = ( state = initialState, action ) => {
    const { type, payload } = action
    switch(type){
        case Types.GET_LECTURE_SUCCESS:
            return{
                ...state,
                lecture: payload
            }
        case Types.GET_LECTURE:
            return{
                ...state,
                loadings: true
            }
        case Types.GET_LECTURE_FAILED:
        default:
            return state
    }
}