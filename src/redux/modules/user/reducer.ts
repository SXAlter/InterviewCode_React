import produce from 'immer'
import { AnyAction } from 'redux'

import * as types from '@/redux/constant'
import { UserInfoState } from '@/redux/interface'

const userState: UserInfoState = {
    userName: '',
    token: ''
}

// user reducer
const user = (state: UserInfoState = userState, action: AnyAction) =>
    produce(state, (draftState: { token: string; userName: string }) => {
        switch (action.type) {
            case types.SET_TOKEN:
                draftState.token = action.token
                break
            case types.SET_NAME:
                draftState.userName = action.userName
                break
            case types.CLEAR_INFO:
                draftState.userName = ''
                draftState.token = ''
                break
            default:
                return draftState
        }
    })

export default user
