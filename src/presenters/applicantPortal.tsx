import { useEffect, useState } from "react";
import { createApplication, getOwnApplication } from "../apis/applicantAPI";
import ApplicationEditor, { applicationEditorProps } from "../components/applicationEditor";
import ApplicationCreationData from "../models/ApplicationCreationData";
import OwnApplicationResponse from "../models/OwnApplicationResponse";

export default function ApplicantPortal() {
    type OwnApp = OwnApplicationResponse | null;

    const [application, setApplication] = useState<OwnApp>(null);

    useEffect(() => {
        getOwnApplication().then(e => setApplication(e))
            .catch(err => console.log(`Error retrieving own application data: ${err}`))
    })

    console.log(JSON.stringify(application?.availabilities))


    const props: applicationEditorProps = {
        displayCurrApp: application !== null,
        callback: () => { console.log("callback") },
        currApp: application
    }



    return (
        <div id="applicant-portal" className="applicant-portal">
            <ApplicationEditor {...props} />
        </div>
    )
}