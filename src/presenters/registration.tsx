import { useRef, useState } from "react";
import RegistrationComponent, { registrationComponentProps } from "../components/registrationComponent";
import RegFormData from "../models/RegFormData";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loginStates } from "../enums/enums";
import { Navigate } from "react-router-dom";
import { Paths } from "../enums/navigations";
import { registerApplicant } from "../apis/authAPI";
import RegResponse from "../models/RegResponse";
import Loading from "../components/loading";



export default function Registration() {
    const authStatus: loginStates = useSelector((state: RootState) => state.auth.loginStatus);
    const [loading, setLoading] = useState<boolean>(false);
    const [regAttempted, setRegAttempted] = useState<boolean>(false);
    const [attemptCount, setAttempCount] = useState<number>(0);
    const attemptSucceded = useRef<boolean|undefined>(undefined);
    const attemptFailMessage = useRef<string|undefined>(undefined);
    const failureCauses = useRef<string[]|undefined>(undefined);
    

    const props: registrationComponentProps = { inputs: [{ type: "text", description: "username", reference: useRef<HTMLInputElement>(null) }], regAttempted: regAttempted,attempCount:attemptCount, attemptSucceded:attemptSucceded.current, attemptFailMessage:attemptFailMessage.current, failureCauses:failureCauses.current };
    props.inputs.push({ type: "password", description: "password", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "personal number", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "email", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "name", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "surname", reference: useRef<HTMLInputElement>(null) });

    console.log(props);
    console.log("presenter render")

    props.onSubmit = async (event) => {
        try {
            event.preventDefault();

            if(regAttempted)setRegAttempted(false);

            const form = event.target as HTMLFormElement;
            console.log((form[0] as HTMLInputElement).value);
            console.log(props.inputs[0].reference.current?.value)

            const inputs: (string | undefined)[] = props.inputs.map(e => {
                const val = e.reference.current?.value;
                return val === "" ? undefined : val;
            })

            const formObj = new RegFormData(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], inputs[5]);

            setLoading(true);
            if (formObj.isValidForm()) {
                const resp:RegResponse = await registerApplicant(formObj);
                setLoading(false);
                attemptSucceded.current = resp.regStatus;
                if(!attemptSucceded.current){
                    attemptFailMessage.current = "Registation failed due to given described causes";
                    failureCauses.current = resp.causes;
                }

            } else {
                setLoading(false);
                console.log("fail: Empty parts in the form");
                attemptSucceded.current = false;
                attemptFailMessage.current = "Please fill all form values";
                failureCauses.current = undefined;
            }
        } catch (error) {
            console.log(error);
            attemptSucceded.current = false;
            attemptFailMessage.current = "Unknown fatal error";
        } finally {
            console.log("finally")
            setRegAttempted(true);
            setAttempCount(c => c + 1);
        }
    }

    return (loading?<Loading/>:(authStatus === loginStates.LOGGED_OUT ? <RegistrationComponent {...props} /> : <Navigate to={Paths.ROOT} />));
}