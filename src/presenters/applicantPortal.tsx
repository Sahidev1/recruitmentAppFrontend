import { useEffect, useRef, useState } from "react";
import { createApplication, getCompetencyList, getOwnApplication } from "../apis/applicantAPI";
import ApplicationEditor, { applicationEditorProps } from "../components/applicationEditor";
import ApplicationCreationData, { availability, competence_profile } from "../models/ApplicationCreationData";
import OwnApplicationResponse from "../models/OwnApplicationResponse";
import useDumbRerenderer from "../costumHooks/rerender";
import AppCreationResponse from "../models/AppCreationResponse";
import TraceError from "../utils/TraceError";

export default function ApplicantPortal() {
    type OwnApp = OwnApplicationResponse | null;

    const forceRender = useDumbRerenderer();

    const [application, setApplication] = useState<OwnApp>(null);


    //const hardRender = useDumbRerenderer();
    const compList = useRef<{ id: number, name: string }[] | null>(null);



    useEffect(() => {
        async function loadData() {
            try {
                const res0 = await getCompetencyList();

                compList.current = res0;
                const res = await getOwnApplication();

                //sleep 10ms
                //await new Promise((resolve) => setTimeout(resolve, 100));

                setApplication(res);

            } catch (error) {
                forceRender();
                console.log(`Error retrieving own application data: ${error}`);
            }
        }

        loadData();
    }, []);

    //console.log(JSON.stringify(application?.availabilities))
    console.log(compList.current)

    const createApp = async (avails: availability[], comps: competence_profile[]) => { 
        const apc = new ApplicationCreationData(avails, comps); 
        try {
            const res:AppCreationResponse = await createApplication(apc);
            console.log(res.creationSuccess?"success":"fail");
        } catch (error) {
            console.log((error as TraceError).Trace());
        }
    };

    const props: applicationEditorProps = {
        displayCurrApp: application !== null,
        callback: () => { console.log(`callback`) },
        currApp: application,
        competencyList: compList.current,
        createAppCB: createApp
    }

    



    return (
        <div id="applicant-portal" className="applicant-portal">
            <ApplicationEditor {...props} />
        </div>
    )
}