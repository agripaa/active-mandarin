import { Types } from "../Constants/Type";

const initialState = {
    data: []
}

export const sponsorReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case Types.GET_SPONSORS_SUCCESS:
            return {
                ...state,
                data: payload
            }
        case Types.GET_SPONSORS:
        case Types.GET_SPONSORS_FAILED:
        default:
            return state;
    }
}