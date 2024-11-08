import { applicantAPImap } from "./apiMaps";
import AppCreationResponse from "../models/AppCreationResponse";
import ApplicationCreationData from "../models/ApplicationCreationData";
import OwnApplicationResponse from "../models/OwnApplicationResponse";

const defaultHeaders:HeadersInit = {"Content-Type":"application/json"};

async function createApplication(application:ApplicationCreationData):Promise<AppCreationResponse>{
    try {
        const rawPayload:{application:any} = application.getJSONpayload();
        const reqOptions:RequestInit = {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(rawPayload.application),
            redirect: "follow",
            credentials: "include"
        };

        const resp:Response = await fetch(applicantAPImap.CREATEAPP, reqOptions);
        const json:any = await resp.json();

        console.log(`respcode: ${resp.status}, body:\n${json}`);

        return new AppCreationResponse(json, resp.status);
    } catch (error) {
        throw error;
    }
}

async function getOwnApplication():Promise<OwnApplicationResponse>{
    try {
        const reqOptions:RequestInit = {
            method: "GET",
            headers: defaultHeaders, 
            redirect: "follow",
            credentials: "include"
        }
        const resp:Response = await fetch(applicantAPImap.OWN, reqOptions);
        const json:any = await resp.json();
        return json as OwnApplicationResponse;
    } catch (error) {
        throw error;        
    }
}

export {createApplication, getOwnApplication}