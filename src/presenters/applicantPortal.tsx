import { createApplication } from "../applicantAPI";
import ApplicationEditor, { applicationEditorProps } from "../components/applicationEditor";
import ApplicationCreationData from "../models/ApplicationCreationData";

export default function ApplicantPortal(){

    const data:ApplicationCreationData = new ApplicationCreationData("john","doe","19921122-3211", "fake@fakemail.com");

    const props:applicationEditorProps = {
        displayCurrApp:true,
        callback: ()=>createApplication(data).then(e=>console.log(e)).catch(err=>console.log(`ERROR: \n${err}`))
    }    

    return (
        <div id="applicant-portal" className="applicant-portal">
            <ApplicationEditor {...props}/>
        </div>
    )
}