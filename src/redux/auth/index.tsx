import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface IinitialState {

    isUUIDAuthenticated : null | string,
    token : null | string,
    username : null | string,
    avatar : any,
    fullname : null | string,
    id : null | string,
}


const initialState : IinitialState = {

    isUUIDAuthenticated :window.sessionStorage.getItem("auth"),
    token : window.sessionStorage.getItem("authToken"),
    username : window.sessionStorage.getItem("authUsername"),
    avatar : window.sessionStorage.getItem("authAvatar"),
    fullname : window.sessionStorage.getItem("authFullname"),
    id : window.sessionStorage.getItem("authId")
}


const AuthSlice = createSlice({
    name : "authSlice",
    initialState: initialState,
    reducers : {
        setAuth : (state : IinitialState, {payload}: PayloadAction<any>)=>{
                window.sessionStorage.setItem("authToken", payload.token)
                window.sessionStorage.setItem("authUsername", payload.username)
                window.sessionStorage.setItem("authAvatar", payload.avatar)
                window.sessionStorage.setItem("authFullname", payload.fullname)
                window.sessionStorage.setItem("auth", payload.isAuthenticated)
                window.sessionStorage.setItem("authId", payload.id)
                state.isUUIDAuthenticated = payload.isAuthenticated
                state.token = payload.token 
                state.username = payload.username 
                state.avatar = payload.avatar 
                state.fullname = payload.fullname
                state.id = payload.id
        }
    }
})

export default AuthSlice.reducer;
export const {setAuth} = AuthSlice.actions