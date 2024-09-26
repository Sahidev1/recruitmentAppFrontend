import { useRef } from "react";
import AuthCredential from "../models/AuthCredential";
import { LoginFormProps, LoginProps} from "../interfaces/Props";

export default function LoginForm(props:LoginFormProps){
  

    return (
            <div id="loginForm">
                username
                <input  ref={props.usernameRef} id="uname" name="uname"></input><br/>
                password
                <input ref={props.passwordRef} type="text" id="password" name="password"></input><br/>
                <button onClick={props.actionFn}>Login</button>
            </div>
    );
}