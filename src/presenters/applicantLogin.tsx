import { useRef } from "react";
import LoginForm from "../components/loginForm";
import { credentialTypes, loginStates, userRole } from "../enums/enums";
import { LoginProps} from "../interfaces/Props";
import AuthCredential from "../models/AuthCredential";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setAuthStatus, setAuthUsername, setUserRole } from "../redux/Authslice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginFormProps } from "../components/loginForm";
import { logOut } from "../apis/authAPI";

export default function ApplicantLogin(props:LoginProps){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const dispatch = useDispatch<AppDispatch>();
    
    
    console.log(`render triggered`);
    
    async function actionFn():Promise<any>{
        try {
            if(userName.current !== null && password.current !== null){
                const acred = new AuthCredential(userName.current.value, password.current.value);
                const res = await props.loginCallback(acred);
                console.log(res);
                
                if (res.isValidLoginResponse(userRole.APPLICANT)){
                    // Since we are using react 18 we do not need to explicitly batch the dispatch calls.
                    // Below dispatch calls will be automatically batched and only cause one potential rerender
                    dispatch(setAuthStatus(loginStates.APPLICANT_LOGGED_IN));
                    dispatch(setAuthUsername(res.username as string));
                    dispatch(setUserRole(res.userRole as number));
                }
                else {
                    console.log("login failed");
                    await logOut();
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