import { authenticateApplicant } from "../apis/authAPI";
import { credentialTypes, loginStates, userRole } from "../enums/enums";
import { LoginProps } from "../interfaces/Props";
import UserLogin from "./userLogin";


export default function ApplicantLogin(){
    
    const props:LoginProps = {
        loginCallback:authenticateApplicant,
        userRoleCheck:userRole.APPLICANT,
        authStatusVal:loginStates.APPLICANT_LOGGED_IN,
        credType: credentialTypes.RECRUITER,
        welcomeMessage: "welcome to applicant portal!"
    }

    return <UserLogin {...props}/>
}