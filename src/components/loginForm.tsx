
export interface LoginFormProps {
    actionFn: () => Promise<any>,
    credType: string,
    usernameRef: React.RefObject<HTMLInputElement>,
    passwordRef: React.RefObject<HTMLInputElement>,
}

export default function LoginForm(props:LoginFormProps){
  

    return (
        <div id="loginForm">
            username
            <input  ref={props.usernameRef} id="uname" name="uname"></input><br/>
            password
            <input ref={props.passwordRef} type="password" id="password"  name="password"></input><br/>
            <button onClick={props.actionFn}>Login</button>
        </div>
    );
}