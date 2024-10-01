import { userRole } from "../enums/enums";


export class AuthResponse {
    loginStatus:string | undefined;
    username:string | undefined;
    name:string | undefined;
    userRole: number | undefined;

    constructor(authResJSON:any){
        this.loginStatus = authResJSON["login_status"];
        this.username = authResJSON["username"];
        this.name = authResJSON["name"];
        this.userRole = authResJSON["role"] as userRole;
    }

    public isValidResponse(expected:userRole):boolean{
        return (typeof this.loginStatus === 'string' &&
            typeof this.username === 'string' &&
            typeof this.userRole === 'number' &&
            this.userRole === expected
        );
    }
}