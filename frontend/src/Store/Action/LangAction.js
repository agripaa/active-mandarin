import { LangType } from "../Constants/LangType"

export const HandleLang = (bool) => {
    return{
        type: LangType.CHANGE_LANG,
        payload: bool
    }
}

export const getLanguage = () => {
    return{
        type: LangType.GET_LANG
    }
}