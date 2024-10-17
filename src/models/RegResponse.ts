
export default class RegResponse {
    public respCode: number | undefined;
    public regStatus: boolean;
    public username: string | undefined;
    public causes: string[];

    constructor(jsonPayload:any, respCode:number|undefined = undefined){
        this.respCode = respCode;
        this.regStatus = jsonPayload['register_status'];
        this.username = jsonPayload['user'];
        this.causes = jsonPayload['causes'];
    }
}
