import { createBrowserRouter } from "react-router-dom";
import { authenticateApplicant } from "./apis/authAPI";
import { LoginProps } from "./interfaces/Props";
import StartPortal from "./presenters/startPortal";
import ApplicantLogin from "./presenters/applicantLogin";
import RecruiterLogin from "./presenters/recruiterLogin";


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