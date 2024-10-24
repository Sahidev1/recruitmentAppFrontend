import { fetchStatus } from "../enums/enums";
import AuthCredential from "../models/AuthCredential";
import { AuthResponse } from "../models/AuthResponse";
import RegFormData from "../models/RegFormData";
import RegResponse from "../models/RegResponse";
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
        return new AuthResponse(jsonResp,resp.status);
    } catch (error) {
        throw error;
    }
}

async function registerApplicant(data:RegFormData):Promise<RegResponse>{
    try {
        const rawData:string = data.getRawJSON();
        const reqOptions:RequestInit = {
            method:"POST",
            headers: headers,
            body: rawData,
            redirect: "follow",
            credentials: "include"
        }
        
        const resp:Response = await fetch(applicantAPImap.REGISTER, reqOptions);
        const jsonResp = await resp.json();
        console.log(jsonResp)//remeber to remove
        return new RegResponse(jsonResp, resp.status);
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
        return new AuthResponse(jsonResp, resp.status);
    } catch (error) {
        throw error;
    }
}

async function logOut():Promise<fetchStatus>{
    try {
        const reqOpions:RequestInit = {
            method: "GET",
            headers: headers,
            redirect:"follow",
            credentials:"include"
        }
        const resp:Response = await fetch(applicantAPImap.LOGOUT, reqOpions);
        if (resp.ok) return fetchStatus.SUCCESS;
        return fetchStatus.FAIL;

    } catch (error) {
        throw error;
    }
}



export {authenticateApplicant, checkAuthenticationState, logOut, registerApplicant};