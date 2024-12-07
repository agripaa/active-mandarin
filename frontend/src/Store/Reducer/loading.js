import { Types } from "../Constants/Type"

const initialState = {
    load: false
}

export const loadingScreen = ( state = initialState, action) => {
    const { type } = action
    switch (type) {
        case Types.ONLOAD:
            return{
                load: true
            }
        case Types.ONLOAD_DONE:
            return{
                load: false
            }
        default:
            return state
    }
}