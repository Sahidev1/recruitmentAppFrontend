import { useRef } from "react";
import AuthCredential from "../models/AuthCredential";
import { LoginProps} from "../interfaces/Props";

export default function LoginForm(props:LoginProps){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    function actionFn(){
        console.log(userName.current?.value);
        console.log(password.current?.value);
        if(userName.current !== null && password.current !== null){
            const acred = new AuthCredential(userName.current.value, password.current.value);
            props.loginCallback(acred).then(e=> console.log(e)).
            catch(err => console.log(`Error!: ${err}`))
        }
        
    }

    return (
            <div id="loginForm">
                username
                <input  ref={userName} id="uname" name="uname"></input><br/>
                password
                <input ref={password} type="text" id="password" name="password"></input><br/>
                <button onClick={actionFn}>Login</button>
            </div>
    );
}