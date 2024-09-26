import { redirect } from "react-router-dom";
import AuthCredential from "../models/AuthCredential";
import { applicantAPImap } from "./apiMaps";

async function authenticateApplicant(auth: AuthCredential):Promise<any>{
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
        console.log(resp);
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

export {authenticateApplicant};