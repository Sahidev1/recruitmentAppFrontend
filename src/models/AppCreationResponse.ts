
export default class AppCreationResponse {
    public respCode: number;
    public creationSuccess: boolean;
    public message:string | undefined;

    constructor(jsonPayload:any, respCode:number){
        this.respCode = respCode;
        this.creationSuccess = respCode === 200;
        this.message = jsonPayload;
    }
}