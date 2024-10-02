import { useRef } from "react";
import LoginForm from "../components/loginForm";
import { credentialTypes, loginStates, userRole } from "../enums/enums";
import { LoginProps } from "../interfaces/Props";
import AuthCredential from "../models/AuthCredential";
import { LoginFormProps } from "../components/loginForm";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setAuthStatus, setAuthUsername, setUserRole } from "../redux/Authslice";
import { Navigate } from "react-router-dom";

export default function RecruiterLogin(props:LoginProps){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const dispatch = useDispatch<AppDispatch>();
    
    async function actionFn():Promise<any>{
        try {
            if(userName.current !== null && password.current !== null){
                const acred = new AuthCredential(userName.current.value, password.current.value);
                const res = await props.loginCallback(acred);
                if (res.isValidResponse(userRole.RECRUITER)){
                    dispatch(setAuthStatus(loginStates.RECRUITER_LOGGED_IN));
                    dispatch(setAuthUsername(res.username as string));
                    dispatch(setUserRole(userRole.RECRUITER));
                }
                else {
                    console.log("Login failed!");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const credType:string = credentialTypes.RECRUITER

    const propsWrap:LoginFormProps = {
        actionFn:actionFn,
        credType: credType,
        usernameRef: userName,
        passwordRef: password
    }

    return (
        (loginStatus === loginStates.LOGGED_OUT && <div className="recruiter_login">  
            <div className="recruiter_login_header "> Welcome to recruiter login page</div>
            <LoginForm {...propsWrap}/>
        </div>) || <Navigate to="/"/>
    );
}