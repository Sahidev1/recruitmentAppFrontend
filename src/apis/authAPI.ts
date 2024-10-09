import AuthCredential from "../models/AuthCredential";
import { AuthResponse } from "../models/AuthResponse";
import { applicantAPImap } from "./apiMaps";

const headers:HeadersInit = {"Content-Type":"application/json"};

async function authenticateApplicant(auth: AuthCredential):Promise<AuthResponse>{
    try {
        
        const rawAuth:string = auth.getRAWauthJSON();
        const reqOptions:RequestInit = {
            method: "POST",
            headers: headers,
            body: rawAuth,
            redirect: "follow",
            credentials: "include"
        };

        const resp:Response = await fetch(applicantAPImap.LOGIN, reqOptions);
     
        const jsonResp = await resp.json();
        console.log(jsonResp)
        return new AuthResponse(jsonResp);
    } catch (error) {
        throw error;
    }
}

async function checkAuthenticationState():Promise<AuthResponse>{
    try {
        const reqOptions:RequestInit = {
            method: "GET",
            headers: headers,
            redirect:"follow",
            credentials:"include"
        };

        const resp:Response = await fetch(applicantAPImap.CHECK_AUTH, reqOptions);
        const jsonResp = await resp.json();
        return new AuthResponse(jsonResp);
    } catch (error) {
        throw error;
    }
}

async function logOut(){
    try {
        const reqOpions:RequestInit = {
            method: "GET",
            headers: headers,
            redirect:"follow",
            credentials:"include"
        }
    } catch (error) {
        throw error;
    }
}



export {authenticateApplicant, checkAuthenticationState};