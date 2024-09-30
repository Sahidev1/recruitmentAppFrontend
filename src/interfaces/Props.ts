import React from "react";
import AuthCredential from "../models/AuthCredential";


type StateTuple<T> = {
    state: T,
    setter: (arg:T) => void
}

type primitive = string | number | boolean;

type priMap<K> = {
    [key in keyof K]:primitive
} | {}



interface Props<T> {
    message?: string;
    callback?: Function;
    stateTuple?: StateTuple<T>;
    dataPayload?: object;
    primitiveProps?:priMap<primitive>;
}

interface LoginProps {
    loginCallback(auth:AuthCredential):Promise<any>,
    //loginStateSetter(newState: Number):void
}



export type {Props, LoginProps, priMap, StateTuple};