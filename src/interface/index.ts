export namespace LoginApiForm {
    export interface ReqForm {
        userName: string
        password: string
    }
    export interface ResLogin {
        token: string
    }
}
