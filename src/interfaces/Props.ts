import React from "react";
import AuthCredential from "../models/AuthCredential";



interface Props {
    message?: string;
    callback?: Function;
    setter?: Function;
    dataPayload?: object;
}

interface LoginProps {
    loginCallback(auth:AuthCredential):Promise<any>,
    //loginStateSetter(newState: Number):void
}

interface LoginFormProps {
    actionFn: () => Promise<any>,
    credType: string,
    usernameRef: React.RefObject<HTMLInputElement>,
    passwordRef: React.RefObject<HTMLInputElement>,
}

export type {Props, LoginProps, LoginFormProps};