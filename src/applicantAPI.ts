import { applicantAPImap } from "./apis/apiMaps";
import AppCreationResponse from "./models/AppCreationResponse";
import ApplicationCreationData from "./models/ApplicationCreationData";


const defaultHeaders:HeadersInit = {"Content-Type":"application/json"};

async function createApplication(application:ApplicationCreationData):Promise<AppCreationResponse>{
    try {
        const rawPayload:string = application.getJSONpayload();
        const reqOptions:RequestInit = {
            method: "POST",
            headers: defaultHeaders,
            body: rawPayload,
            redirect: "follow",
            //credentials: "include"
        };

        const resp:Response = await fetch(applicantAPImap.CREATEAPP, reqOptions);
        const json:any = await resp.json();

        console.log(`respcode: ${resp.status}, body:\n${json}`);

        return new AppCreationResponse(json, resp.status);
    } catch (error) {
        throw error;
    }
}

export {createApplication}