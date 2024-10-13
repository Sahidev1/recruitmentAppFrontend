import { useRef, useState } from "react";
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
import { logOut } from "../apis/authAPI";
import Loading from "../components/loading";

export default function RecruiterLogin(props:LoginProps){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const dispatch = useDispatch<AppDispatch>();

    const[loading, setLoading] = useState<boolean>(false);

    const [err, setErr] = useState<boolean>(false);
    const [failedLoginAttempt, setFLA] = useState<boolean>(false);
    
    async function actionFn():Promise<any>{
        try {
            if(userName.current !== null && password.current !== null){
                const acred = new AuthCredential(userName.current.value, password.current.value);
                setLoading(true);
                const res = await props.loginCallback(acred);
                setLoading(false);
                if(err)setErr(false);
                if (res.isValidLoginResponse(userRole.RECRUITER)){
                    dispatch(setAuthStatus(loginStates.RECRUITER_LOGGED_IN));
                    dispatch(setAuthUsername(res.username as string));
                    dispatch(setUserRole(userRole.RECRUITER));
                }
                else {
                    console.log(`login failed with code: ${res.respCode || 'unspecified'}`);
                    if(res.respCode === 200){
                        await logOut();
                    } // this handles wrong role login
                    setFLA(true);
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(true);
        }
    }

    const credType:string = credentialTypes.RECRUITER

    const propsWrap:LoginFormProps = {
        actionFn:actionFn,
        credType: credType,
        usernameRef: userName,
        passwordRef: password,
        lastAttemptFailed: failedLoginAttempt,
        error:err
    }

    return (
        loading?<Loading/>:(loginStatus === loginStates.LOGGED_OUT && <div className="recruiter_login">  
            <div className="recruiter_login_header "> Welcome to recruiter login page</div>
            <LoginForm {...propsWrap}/>
        </div>) || <Navigate to="/"/>
    );
}