
const REACT_APP_PREFIX:string = 'REACT_APP_';

export function readEnv(envVar:string){
    const envKey:string=REACT_APP_PREFIX + envVar;
    return process.env[envKey];
}

export function concateReadEnv(vars: string[]): string {
    return vars.reduce((acc: string, curr: string) => {
        return acc + readEnv(curr);
    },"");
}
