import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authenticateApplicant, checkAuthenticationState } from "./apis/authAPI";
import { LoginProps } from "./interfaces/Props";
import StartPortal from "./presenters/startPortal";
import ApplicantLogin from "./presenters/applicantLogin";
import RecruiterLogin from "./presenters/recruiterLogin";
import { useEffect, useRef, useState } from "react";
import { authStatus, loginStates } from "./enums/enums";
import { AuthResponse } from "./models/AuthResponse";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { setAuthStatus, setAuthUsername, setUserRole } from "./redux/Authslice";
import Loading from "./components/loading";


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


export default function App(){
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const authCheckState = useRef<boolean>(false);
    const setAuthCheckState = (newState:boolean) => authCheckState.current = newState;
    const dispatch = useDispatch<AppDispatch>();
    const MAX_LOADING_MS = 400;
    console.log("root render")
    
    // initial page loading effect
    // should only be triggered in the context of refreshes or new visists
    useEffect(()=>{
        if(!isLoading) return;

        const checkAuthCB = new Promise<void>(async (resolve) => {
            const res:AuthResponse = await checkAuthenticationState();
            if(res.authStatus === authStatus.AUTHORIZED && !authCheckState.current){
                dispatch(setAuthStatus(loginStates.APPLICANT_LOGGED_IN));
                dispatch(setAuthUsername(res.username as string));
                dispatch(setUserRole(res.userRole as number));
            }
            resolve();
        });

        const spinCB = new Promise<void>(async (resolve, reject)=> {
            setTimeout(()=> {
                if(!authCheckState.current) {
                    setAuthCheckState(true)
                }
                reject();
            }, MAX_LOADING_MS);
        });

        Promise.race([checkAuthCB, spinCB]).then(()=>{
            setIsLoading(false);
            console.log("successfull auth check");
        }).catch(()=>{
            setIsLoading(false);
            console.log("authcheck timed out!");
        })
    })
    return (isLoading?<Loading/>:<RouterProvider router={router}/>)
}