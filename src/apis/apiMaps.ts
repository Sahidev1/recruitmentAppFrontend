import apiVars from "./apiVars";


type Immutable<T> = {
    +readonly [K in keyof T]: T[K];
}

interface APImap{
    [key:string]: string;
}

interface apiMap extends APImap {
    LOGIN:string, 
    CHECK_AUTH:string,
    LOGOUT:string
    REGISTER:string
}

const applicantAPImap:Immutable<apiMap> = {
    LOGIN:apiVars.LOGIN,
    CHECK_AUTH:apiVars.CHECK_AUTH,
    LOGOUT:apiVars.LOGOUT,
    REGISTER:apiVars.REGISTER
}

export {applicantAPImap}
