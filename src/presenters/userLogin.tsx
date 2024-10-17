import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginProps } from "../interfaces/Props";
import { RootState, AppDispatch } from "../redux/store";
import AuthCredential from "../models/AuthCredential";
import { logOut } from "../apis/authAPI";
import LoginForm, { LoginFormProps } from "../components/loginForm";
import Loading from "../components/loading";
import { Navigate } from "react-router-dom";
import { loginStates } from "../enums/enums";
import { setAuthStatus, setAuthUsername, setUserRole } from "../redux/Authslice";


export default function UserLogin(props:LoginProps){
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
                if (res.isValidLoginResponse(props.userRoleCheck)){
                    dispatch(setAuthStatus(props.authStatusVal));
                    dispatch(setAuthUsername(res.username as string));
                    dispatch(setUserRole(res.userRole as number));
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

    const propsWrap:LoginFormProps = {
        actionFn:actionFn,
        credType:props.credType,
        usernameRef:userName,
        passwordRef:password,
        lastAttemptFailed:failedLoginAttempt,
        error:err,
        additionalButtons: props.additionalButtons
    }

    return (
        loading?<Loading/>:(loginStatus === loginStates.LOGGED_OUT && <div className="recruiter_login">  
            <div className="recruiter_login_header ">{props.welcomeMessage}</div>
            <LoginForm {...propsWrap}/>
        </div>) || <Navigate to="/"/>
    )
}