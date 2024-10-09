import { Navigate, Outlet, useLocation } from "react-router-dom";
import StatusComponent from "../components/statusComponent";
import { statusComponentProps } from "../components/statusComponent";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Authstate } from "../redux/Authslice";
import { loginStates, userRole } from "../enums/enums";
import NavigationComponent, { navigationComponentProps } from "../components/navigationComponent";
import { useRef, useState } from "react";
import { Paths } from "../enums/navigations";


export default function TopBar(){
    console.log("topbar render")
    const status:Authstate = useSelector((state: RootState) => state.auth);
    const props:statusComponentProps = {
        loginStatus:status.loginStatus,
        username:status.username,
        userRole: status.userRole
    }
    const location = document.location;
    const [nav, setNav] = useState<string>(location.pathname);
    const prev = useRef<string>(location.pathname)

    const posPaths:string[] = [Paths.ROOT, Paths.APPLICANT_PORTAL, Paths.RECRUITER_PORTAL];
    const descriptorMap: { [key: string]: string } = {[Paths.ROOT]:"Main portal", [Paths.APPLICANT_PORTAL]:"Application Portal",
        [Paths.RECRUITER_PORTAL]:"Recruitment Portal"
    }

    let availableNavs:string[];
    if (status.loginStatus == loginStates.LOGGED_OUT){
        availableNavs= posPaths.filter((v:string)=>v != nav);
    } else {
        availableNavs=[]
    }

    const navCallbacks:({descriptor:string,cb:() => void})[] = availableNavs.map(
        e => {
            return {descriptor:descriptorMap[e], cb: ()=>{
                prev.current = nav;
                setNav(e);
            }}
        }
    )

    const navProps:navigationComponentProps = {
        callbacks:navCallbacks
    }

    


    return (
        <>
            {(nav !== prev.current && <Navigate to={nav}/>)||
            
            (<><StatusComponent {...props} /><NavigationComponent {...navProps} /><Outlet /></>)
            
            }
        </>
    );
}