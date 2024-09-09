import { defaultRequest } from '@/utils/http/index'

interface loginState {
    userName: string
    password: string
}

export function login(params: loginState) {
    return defaultRequest.request({
        url: '/user/login',
        method: 'post',
        data: params
    })
}
