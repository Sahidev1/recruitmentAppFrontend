import { applicantAPImap } from "./apiMaps";
import AppCreationResponse from "../models/AppCreationResponse";
import ApplicationCreationData from "../models/ApplicationCreationData";
import OwnApplicationResponse from "../models/OwnApplicationResponse";
import { json } from "stream/consumers";

const defaultHeaders: HeadersInit = { "Content-Type": "application/json" };

async function createApplication(application: ApplicationCreationData): Promise<AppCreationResponse> {
    try {
        const rawPayload: { application: any } = application.getJSONpayload();
        const reqOptions: RequestInit = {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(rawPayload.application),
            redirect: "follow",
            credentials: "include"
        };

        const resp: Response = await fetch(applicantAPImap.CREATEAPP, reqOptions);
        const json: any = await resp.json();

        console.log(`respcode: ${resp.status}, body:\n${json}`);

        return new AppCreationResponse(json, resp.status);
    } catch (error) {
        throw error;
    }
}

async function getOwnApplication(timeout?: number): Promise<OwnApplicationResponse> {
    try {
        const reqOptions: RequestInit = {
            method: "GET",
            headers: defaultHeaders,
            redirect: "follow",
            credentials: "include"
        }

        if (timeout) {
            reqOptions.signal = AbortSignal.timeout(timeout);
        }
        const resp: Response = await fetch(applicantAPImap.OWN, reqOptions);
        const json: any = await resp.json();
        console.log("SUCCESS");
        return json as OwnApplicationResponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCompetencyList(): Promise<{ id: number, name: string }[]> {
    try {
        const requestOptions:RequestInit = {
            method: "GET",
            headers: defaultHeaders,
            redirect: "follow",
            credentials: "include"
        };
        const response:Response = await fetch(applicantAPImap.COMPETENCIES, requestOptions);
        const json:any = await response.json();
        return json as { id: number, name: string }[];
    } catch (error) {
        throw error;
    }
}

export { createApplication, getOwnApplication, getCompetencyList }