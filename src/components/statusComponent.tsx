import { loginStates, userRole } from "../enums/enums"


export interface statusComponentProps {
    loginStatus:loginStates,
    username: string,
    userRole: userRole
}

export default function StatusComponent(props:statusComponentProps){
    

    return <>
        {(props.loginStatus === loginStates.LOGGED_OUT && <p>User logged out</p>)||
        <p>Welcome {props.userRole === userRole.APPLICANT?'applicant':'recruiter'} {props.username} </p>}
    </>
} 