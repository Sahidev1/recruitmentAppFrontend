import {  useContext, useState } from "react";
import { authenticateApplicant } from "../apis/authAPI";
import { credentialTypes, loginStates, userRole } from "../enums/enums";
import { LoginProps, oProps } from "../interfaces/Props";
import UserLogin from "./userLogin";
import { Navigate } from "react-router-dom";
import { Paths } from "../enums/navigations";
import { NavContext, NavContextType } from "./topBar";


export default function ApplicantLogin(){
    const navContext:NavContextType = useContext<NavContextType>(NavContext);
    //const [navToReg, setNavToReg] = useState<boolean>(false);
    console.log(navContext)
    
    const props:LoginProps = {
        loginCallback:authenticateApplicant,
        userRoleCheck:userRole.APPLICANT,
        authStatusVal:loginStates.APPLICANT_LOGGED_IN,
        credType: credentialTypes.RECRUITER,
        welcomeMessage: "welcome to applicant portal!",
        additionalButtons:[{descriptor:'register', onClick(e) {
            navContext.navTo(Paths.REGISTRATION)
        },}]
    }

    return (/*navToReg?<Navigate to={Paths.REGISTRATION}/>:*/<UserLogin {...props}/>);
}