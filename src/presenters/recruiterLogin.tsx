import { useRef } from "react";
import LoginForm from "../components/loginForm";
import credentialTypes from "../enums/credentialTypes";
import { LoginProps } from "../interfaces/Props";
import AuthCredential from "../models/AuthCredential";
import { LoginFormProps } from "../components/loginForm";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";

export default function RecruiterLogin(props:LoginProps){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const dispatch = useDispatch<AppDispatch>();
    
    async function actionFn():Promise<any>{
        try {
            if(userName.current !== null && password.current !== null){
                const acred = new AuthCredential(userName.current.value, password.current.value);
                const res = props.loginCallback(acred);
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
        <div>
            <div className="recruiter_login_header"> Welcome to recruitment login portal</div>
            <LoginForm {...propsWrap}/>
        </div>
    );
}