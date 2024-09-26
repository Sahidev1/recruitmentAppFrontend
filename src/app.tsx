import { createBrowserRouter } from "react-router-dom";
import { authenticateApplicant } from "./apis/authAPI";
import { LoginProps } from "./interfaces/Props";
import StartPortal from "./views/startPortal";
import ApplicantLogin from "./views/applicantLogin";
import RecruiterLogin from "./views/recruiterLogin";
import { useState } from "react";
import loginStates from "./enums/loginStates";
import AuthCredential from "./models/AuthCredential";

//const [loginState, setLoginState] = useState<Number>(loginStates.LOGGED_OUT);

const login: LoginProps = {
    loginCallback: authenticateApplicant,
    //loginStateSetter: setLoginState
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartPortal />,
    },
    {
        path: "/applicant_portal",
        element: <ApplicantLogin {...login} />
    },
    {
        path: "/recruiter_portal",
        element: <RecruiterLogin {...login} />
    }
]);

export {router}