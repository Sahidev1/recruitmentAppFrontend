import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginStates, userRole } from "../enums/enums";



export interface Authstate {
    loginStatus: number;
    username: string;
    userRole: userRole;
};

const initialState: Authstate = {
    loginStatus: loginStates.LOGGED_OUT,
    username: "",
    userRole: userRole.UNKNOWN
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
        },
        setUserRole(state, action: PayloadAction<userRole>){
            state.userRole = action.payload;
        }
    }
});

export const { setAuthStatus, setAuthUsername, setUserRole} = authSlice.actions;
export default authSlice.reducer;