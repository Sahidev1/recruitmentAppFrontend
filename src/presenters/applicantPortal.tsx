import { useEffect, useRef, useState } from "react";
import { createApplication, getCompetencyList, getOwnApplication } from "../apis/applicantAPI";
import ApplicationEditor, { applicationEditorProps } from "../components/applicationEditor";
import ApplicationCreationData from "../models/ApplicationCreationData";
import OwnApplicationResponse from "../models/OwnApplicationResponse";
import useDumbRerenderer from "../costumHooks/rerender";

export default function ApplicantPortal() {
    type OwnApp = OwnApplicationResponse | null;

    
    const [application, setApplication] = useState<OwnApp>(null);

    //const hardRender = useDumbRerenderer();
    const compList = useRef<{id:number, name:string}[]|null>(null);


    useEffect(() => {

        async function loadData() {
            try {
                const res = await getOwnApplication();
                setApplication(res);

                //sleep 10ms
                //await new Promise((resolve) => setTimeout(resolve, 100));

                const res0 = await getCompetencyList();

                compList.current = res0;
            } catch (error) {
                console.log(`Error retrieving own application data: ${error}`);
            }
        }

        loadData();
    }, []);

    //console.log(JSON.stringify(application?.availabilities))
    console.log(compList.current)


    const props: applicationEditorProps = {
        displayCurrApp: application !== null,
        callback: () => { console.log("callback") },
        currApp: application,
        competencyList: compList.current
    }



    return (
        <div id="applicant-portal" className="applicant-portal">
          <ApplicationEditor {...props} />
        </div>
    )
}