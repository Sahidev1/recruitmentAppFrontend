import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loginStates from "../enums/loginStates";



interface Authstate {
    loginStatus: number;
    username: string;
};

const initialState: Authstate = {
    loginStatus: loginStates.LOGGED_OUT,
    username: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatus(state, action: PayloadAction<number>){
            state.loginStatus = action.payload;
        },
        setAuthUsername(state, action: PayloadAction<string>){
            state.username = action.payload;
        }
    }
});

export const { setAuthStatus, setAuthUsername} = authSlice.actions;
export default authSlice.reducer;