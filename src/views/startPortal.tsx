import { Navigate } from "react-router-dom";
import { useState } from "react";


export default function StartPortal (props:any = null){
    const [portal, setPortal] = useState("main");
    console.log(`render`);

    return (
        <>{
            (portal === "applicant" && <Navigate to="applicant_portal" replace={false}/>) || (portal === "recruiter" && <Navigate to="recruiter_portal" replace={false} />) ||
            <div>
                <p> Hello this is the main portal</p>
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