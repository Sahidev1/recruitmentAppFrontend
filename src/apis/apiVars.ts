import { concateReadEnv, readEnv } from "../utils/readEnv";

export default {
    LOGIN: concateReadEnv(['API_HOST', 'API_PATH_LOGIN'])
};