import { useRef } from "react";

export default function LoginForm(){
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    function actionFn(){
        console.log(userName.current?.value);
        console.log(password.current?.value);
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