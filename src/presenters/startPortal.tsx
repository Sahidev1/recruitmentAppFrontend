import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loginStates } from "../enums/enums";
import {loggedOutPortalProps} from "../components/loggedOutPortal";
import LoggedOutPortal from "../components/loggedOutPortal";
import { Props, priMap } from "../interfaces/Props";


export default function StartPortal (){
    const loginStatus:number = useSelector((state: RootState) => state.auth.loginStatus);
    const user:string = useSelector((state:RootState) => state.auth.username);
    const [portal, setPortal] = useState<string>("main");
    console.log(`render`);
    console.log(loginStatus);
    
    const props:loggedOutPortalProps= {
        stateTuple: {
            state: portal,
            setter: setPortal
        },
        primitiveProps: {
            user:user,
            loginStatus:loginStatus
        }
    }
    
    

    return ((portal === "applicant" && <Navigate to="applicant_portal" replace={false}/>) || (portal === "recruiter" && <Navigate to="recruiter_portal" replace={false} />)
    ||<LoggedOutPortal {...props}/>)
}