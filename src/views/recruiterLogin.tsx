import LoginForm from "../components/loginForm";
import { LoginProps } from "../interfaces/Props";

export default function RecruiterLogin(props:LoginProps){

    return (
        <div>
            <div className="recruiter_login_header"> Welcome to recruitment login portal</div>
            <LoginForm {...props}/>
        </div>
    );
}