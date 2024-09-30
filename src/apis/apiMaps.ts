import apiVars from "./apiVars";


type Immutable<T> = {
    +readonly [K in keyof T]: T[K];
}

interface APImap{
    [key:string]: string;
}

const applicantAPImap:Immutable<APImap> = {
    LOGIN:apiVars.LOGIN
}

export {applicantAPImap}
