import { useRef } from "react";
import LoginForm from "../components/loginForm";
import credentialTypes from "../enums/credentialTypes";
import { LoginProps} from "../interfaces/Props";
import AuthCredential from "../models/AuthCredential";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setAuthStatus, setAuthUsername } from "../redux/Authslice";
import loginStates from "../enums/loginStates";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginFormProps } from "../components/loginForm";

export default function ApplicantLogin(props:LoginProps){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const dispatch = useDispatch<AppDispatch>();
    
    console.log("render triggered");
    
    async function actionFn():Promise<any>{
        try {
            if(userName.current !== null && password.current !== null){
                const acred = new AuthCredential(userName.current.value, password.current.value);
                const res = await props.loginCallback(acred);
                console.log(res.login_status);
                if (res.login_status === "success"){
                    dispatch(setAuthStatus(loginStates.APPLICANT_LOGGED_IN));
                    dispatch(setAuthUsername(res.username));
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const credType:string = credentialTypes.APPLICANT;

    const propsWrap:LoginFormProps = {
        actionFn:actionFn,
        credType: credType,
        usernameRef: userName,
        passwordRef: password
    }

    return (
        (loginStatus === loginStates.LOGGED_OUT && <div className="applicant_login">  
            <div className="application_login_head"> Welcome to applicant login page</div>
            <LoginForm {...propsWrap}/>
        </div>) || <Navigate to="/"/>
    );
}