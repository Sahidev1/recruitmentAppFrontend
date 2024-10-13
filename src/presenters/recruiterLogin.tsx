import { authenticateApplicant } from "../apis/authAPI";
import { credentialTypes, loginStates, userRole } from "../enums/enums";
import { LoginProps } from "../interfaces/Props";
import UserLogin from "./userLogin";


export default function RecruiterLogin(){

    const props:LoginProps = {
        loginCallback:authenticateApplicant,
        userRoleCheck:userRole.RECRUITER,
        authStatusVal:loginStates.RECRUITER_LOGGED_IN,
        credType: credentialTypes.RECRUITER,
        welcomeMessage:"welcome to recruiter portal!"
    }

    return <UserLogin {...props}/>;
}