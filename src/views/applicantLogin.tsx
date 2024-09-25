import { authenticateApplicant } from "../apis/authAPI";
import LoginForm from "../components/loginForm";
import { LoginProps} from "../interfaces/Props";

export default function ApplicantLogin(props:LoginProps){
    return (
        <div className="applicant_login">  
            <div className="application_login_head"> Welcome to applicant login page</div>
            <LoginForm {...props}/>
        </div>
    );
}