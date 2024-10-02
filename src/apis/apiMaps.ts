import apiVars from "./apiVars";


type Immutable<T> = {
    +readonly [K in keyof T]: T[K];
}

interface APImap{
    [key:string]: string;
}

interface apiMap extends APImap {
    LOGIN:string, 
    CHECK_AUTH:string
}

const applicantAPImap:Immutable<apiMap> = {
    LOGIN:apiVars.LOGIN,
    CHECK_AUTH:apiVars.CHECK_AUTH
}

export {applicantAPImap}
