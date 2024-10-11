import { loginStates, userRole } from "../enums/enums"


export interface statusComponentProps {
    loginStatus:loginStates,
    username: string,
    userRole: userRole
}

export default function StatusComponent(props:statusComponentProps){
    

    return <>
        {(props.loginStatus === loginStates.LOGGED_OUT && <>You are logged out</>)||
        <>Welcome {props.userRole === userRole.APPLICANT?'applicant':'recruiter'} {props.username} </>}
    </>
} 