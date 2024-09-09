import * as types from '@/redux/constant'

// * setToken
export const setToken = (token: string) => ({
    type: types.SET_TOKEN,
    token
})

// * setName
export const setName = (userName: string) => ({
    type: types.SET_NAME,
    userName
})

// * clearInfo
export const clearInfo = () => ({
    type: types.CLEAR_INFO
})
