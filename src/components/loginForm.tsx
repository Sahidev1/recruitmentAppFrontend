
export interface LoginFormProps {
    actionFn: () => Promise<any>,
    credType: string,
    usernameRef: React.RefObject<HTMLInputElement>,
    passwordRef: React.RefObject<HTMLInputElement>,
    lastAttemptFailed: boolean,
    error:boolean
}

export default function LoginForm(props:LoginFormProps){
  

    return (
        <div className="loginForm">
            <span className="failed_attempt_box" hidden={!props.lastAttemptFailed}>Login failed</span>
            <span className="error_box" hidden={!props.error}>Error </span>
            username
            <input  ref={props.usernameRef} className="uname" name="uname"></input><br/>
            password
            <input ref={props.passwordRef} type="password" className="password"  name="password"></input><br/>
            <button onClick={props.actionFn}>Login</button>
        </div>
    );
}