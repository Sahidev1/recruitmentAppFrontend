import AuthCredential from "../models/AuthCredential";



interface Props {
    message?: string;
    callback?: Function;
    setter?: Function;
    dataPayload?: object;
}

interface LoginProps {
    loginCallback(auth:AuthCredential):Promise<any>
}

export type {Props, LoginProps};