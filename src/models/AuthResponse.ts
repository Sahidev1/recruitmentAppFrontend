import { authStatus, userRole } from "../enums/enums";
import typeOfTypes from "../enums/typeOfTypes";


export class AuthResponse {
    loginStatus:string | undefined;
    username:string | undefined;
    name:string | undefined;
    userRole: userRole | undefined;
    authStatus: authStatus | undefined;

    constructor(authResJSON:any){
        this.loginStatus = authResJSON["login_status"];
        this.username = authResJSON["username"];
        this.name = authResJSON["name"];
        this.userRole = authResJSON["role_id"];
        this.authStatus = authResJSON["auth_status"];
    }

    public isValidLoginResponse(expected:userRole):boolean{
        return (typeof this.loginStatus === typeOfTypes.STRING &&
            typeof this.username === typeOfTypes.STRING &&
            this.userRole === expected
        );
    }
}