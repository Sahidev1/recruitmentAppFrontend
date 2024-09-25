

type Immutable<T> = {
    +readonly [K in keyof T]: T[K];
}

interface APImap{
    [key:string]: string;
}

const applicantAPImap:Immutable<APImap> = {
    LOGIN:"http://localhost:8000/login"
}

export {applicantAPImap}
