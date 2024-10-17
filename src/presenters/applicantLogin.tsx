import { useState } from "react";
import { authenticateApplicant } from "../apis/authAPI";
import { credentialTypes, loginStates, userRole } from "../enums/enums";
import { LoginProps } from "../interfaces/Props";
import UserLogin from "./userLogin";
import { Navigate } from "react-router-dom";
import { Paths } from "../enums/navigations";


export default function ApplicantLogin(){
    const [navToReg, setNavToReg] = useState<boolean>(false);
    
    const props:LoginProps = {
        loginCallback:authenticateApplicant,
        userRoleCheck:userRole.APPLICANT,
        authStatusVal:loginStates.APPLICANT_LOGGED_IN,
        credType: credentialTypes.RECRUITER,
        welcomeMessage: "welcome to applicant portal!",
        additionalButtons:[{descriptor:'register', onClick(e) {
            setNavToReg(true);
        },}]
    }

    return (navToReg?<Navigate to={Paths.REGISTRATION}/>:<UserLogin {...props}/>);
}