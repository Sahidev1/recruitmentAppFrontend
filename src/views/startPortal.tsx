import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import loginStates from "../enums/loginStates";


export default function StartPortal (props:any = null){
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const user:string = useSelector((state:RootState) => state.auth.username);
    const [portal, setPortal] = useState("main");
    console.log(`render`);
    console.log(loginStatus);
    

    return (
        <>{
            (portal === "applicant" && <Navigate to="applicant_portal" replace={false}/>) || (portal === "recruiter" && <Navigate to="recruiter_portal" replace={false} />) ||
            <div>
                <p>Hello this is the main portal</p>
                {(loginStatus === loginStates.LOGGED_OUT &&<p>You are logged out</p>) || <p>You are logged in {user}!</p>}
                <button onClick={e => setPortal("applicant")}> 
                    Applicant portal 
                    
                </button>
                <button onClick={e => setPortal("recruiter")}> 
                    Recruiter portal
                </button>
            </div>
        }</>
    );
}