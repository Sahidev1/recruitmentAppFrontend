import { Navigate, Outlet, OutletProps, Path, useLocation } from "react-router-dom";
import StatusComponent from "../components/statusComponent";
import { statusComponentProps } from "../components/statusComponent";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Authstate, setAuthStatus, setAuthUsername, setUserRole } from "../redux/Authslice";
import { fetchStatus, loginStates, userRole } from "../enums/enums";
import NavigationComponent, { navigationComponentProps } from "../components/navigationComponent";
import { createContext, useContext, useRef, useState } from "react";
import { Paths } from "../enums/navigations";
import { logOut } from "../apis/authAPI";
import { useDispatch } from "react-redux";
import ActionComponent, { actionComponentProps } from "../components/actionComponent";

type NavContextType = {nav:string, navTo:(path:Paths)=>void};
const NavContext = createContext<NavContextType>({
    nav: "",
    navTo: (path:Paths)=>{return}
});
export {NavContext};
export type {NavContextType};


export default function TopBar() {
    console.log("topbar render")
    const loginstat: loginStates = useSelector((state: RootState) => state.auth.loginStatus);
    const username: string = useSelector((state: RootState) => state.auth.username);
    const role: userRole = useSelector((state: RootState) => state.auth.userRole);
    const status: Authstate = {
        loginStatus: loginstat,
        username: username,
        userRole: role
    }

    const dispatch = useDispatch<AppDispatch>();


    const props: statusComponentProps = {
        loginStatus: status.loginStatus,
        username: status.username,
        userRole: status.userRole
    }
    const location = useLocation();
    const [nav, setNav] = useState<string>(location.pathname);

    const prev = useRef<string>(location.pathname);

    const posPaths: string[] = [Paths.ROOT, Paths.APPLICANT_PORTAL, Paths.RECRUITER_PORTAL];
    const descriptorMap: { [key: string]: string } = {
        [Paths.ROOT]: "Main portal", [Paths.APPLICANT_PORTAL]: "Applicant Portal",
        [Paths.RECRUITER_PORTAL]: "Recruiter Portal"
    }

    let availableNavs: string[];
    if (status.loginStatus === loginStates.LOGGED_OUT) {
        availableNavs = posPaths.filter((v: string) => v !== nav);
    } else {
        availableNavs = []
    }

    const navCallbacks: ({ descriptor: string, cb: () => void })[] = availableNavs.map(
        e => {
            return {
                descriptor: descriptorMap[e], cb: () => {
                    prev.current = nav;
                    setNav(e);
                }
            }
        }
    )

    const navProps: navigationComponentProps = {
        callbacks: navCallbacks
    }


    async function logOutCB(): Promise<void> {
        try {
            const res: fetchStatus = await logOut();
            if (res === fetchStatus.SUCCESS) {
                dispatch(setAuthStatus(loginStates.LOGGED_OUT));
                dispatch(setAuthUsername(""));
                dispatch(setUserRole(userRole.UNKNOWN));
                setNav(Paths.ROOT);
            } else {
                console.log("logout failed!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const actionProps: actionComponentProps = {
        buttons: []
    }

    if (status.loginStatus === loginStates.APPLICANT_LOGGED_IN || status.loginStatus === loginStates.RECRUITER_LOGGED_IN) {
        actionProps.buttons = [...actionProps.buttons, { description: 'logout', callback: logOutCB }]
    }
    console.log(`prev: ${prev.current}, nav: ${nav}`)
    


    return (
        <NavContext.Provider value={{ nav: nav, navTo: (path: Paths) => { prev.current = nav; setNav(path); } }}>
            {nav !== prev.current ? <Navigate to={nav} replace={false} /> : null}
            <>
                <div className="topbar">
                    <span className="status"><StatusComponent {...props} /></span>
                    <span className="nav"><NavigationComponent {...navProps} /></span>
                    <span className="action"><ActionComponent {...actionProps} /></span>
                </div>
                <div id="children_container">
                    <Outlet />
                </div>
            </>
        </NavContext.Provider>
    );
}                       