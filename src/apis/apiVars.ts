import { concateReadEnv, readEnv } from "../utils/readEnv";

interface VarMap{
    LOGIN:string,
    CHECK_AUTH:string,
    LOGOUT:string,
    REGISTER:string
}


export default <VarMap>{
    LOGIN: concateReadEnv(['API_HOST', 'API_PATH_LOGIN']),
    CHECK_AUTH: concateReadEnv(['API_HOST', 'API_PATH_CHECK_AUTH']),
    LOGOUT: concateReadEnv(['API_HOST', 'API_PATH_LOGOUT']),
    REGISTER: concateReadEnv(['API_HOST', 'API_PATH_REGISTER'])
};