import AuthCredential from "../models/AuthCredential";
import { AuthResponse } from "../models/AuthResponse";
import { applicantAPImap } from "./apiMaps";

async function authenticateApplicant(auth: AuthCredential):Promise<AuthResponse>{
    try {
        
        const rawAuth:string = auth.getRAWauthJSON();
        const headers:object = {"Content-Type":"application/json"};
        const reqOptions:object = {
            method: "POST",
            headers: headers,
            body: rawAuth,
            redirect: "follow"
        };

        const resp = await fetch(applicantAPImap.LOGIN, reqOptions);
        const jsonResp = await resp.json();
        console.log(jsonResp)
        return new AuthResponse(jsonResp);
    } catch (error) {
        throw error;
    }
}

export {authenticateApplicant};