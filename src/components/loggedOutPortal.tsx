import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Props, StateTuple, priMap } from "../interfaces/Props";
import { Navigate } from "react-router-dom";
import loginStates from "../enums/loginStates";


export interface loggedOutPortalProps{
    stateTuple:StateTuple<string>,
    primitiveProps:{
        user:string,
        loginStatus: number
    }
}

export default function LoggedOutPortal (cprops:loggedOutPortalProps){
    return (
        <>{
            (cprops.stateTuple.state === "applicant" && <Navigate to="applicant_portal" replace={false}/>) || (cprops.stateTuple.state === "recruiter" && <Navigate to="recruiter_portal" replace={false} />) ||
            <div>
                <p>Hello this is the main portal</p>
                {(cprops.primitiveProps.loginStatus === loginStates.LOGGED_OUT &&<p>You are logged out</p>) || <p>You are logged in {cprops.primitiveProps.user}!</p>}
                <button onClick={e => cprops.stateTuple.setter("applicant")}> 
                    Applicant portal 
                    
                </button>
                <button onClick={e => cprops.stateTuple.setter("recruiter")}> 
                    Recruiter portal
                </button>
            </div>
        }</>
    );
}