import { Types } from "../Constants/Type"

export const getSponsors = () => {
    return{
        type: Types.GET_SPONSORS
    }
}

export const getLecture = () => {
    return{
        type: Types.GET_LECTURE
    }
}

export const getTestimony = () => {
    return{
        type: Types.GET_TESTIMONY
    }
}

export const getPost = () => {
    return{
        type: Types.GET_POST
    }
}

export const getClass = (payload) => {
    return{
        type: Types.GET_CLASS,
        payload: payload
    }
}

export const getFaq = () => {
    return{
        type: Types.GET_FAQ
    }
}

export const getAbout = (payload) => {
    return{
        type: Types.GET_ABOUT,
        payload: payload
    }
}