import { useRef } from "react";
import RegistrationComponent, { registrationComponentProps } from "../components/registrationComponent";
import RegFormData from "../models/RegFormData";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loginStates } from "../enums/enums";
import { Navigate } from "react-router-dom";
import { Paths } from "../enums/navigations";
import { registerApplicant } from "../apis/authAPI";



export default function Registration() {
    const authStatus: loginStates = useSelector((state: RootState) => state.auth.loginStatus);
    

    const props: registrationComponentProps = { inputs: [{ type: "text", description: "username", reference: useRef<HTMLInputElement>(null) }] };
    props.inputs.push({ type: "password", description: "password", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "personal number", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "email", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "name", reference: useRef<HTMLInputElement>(null) });
    props.inputs.push({ type: "text", description: "surname", reference: useRef<HTMLInputElement>(null) });

    props.onSubmit = (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        console.log((form[0] as HTMLInputElement).value);
        console.log(props.inputs[0].reference.current?.value)

        const inputs: (string | undefined)[] = props.inputs.map(e => {
            const val = e.reference.current?.value;
            return val === "" ? undefined : val;
        })

        const formObj = new RegFormData(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], inputs[5]);

        if (formObj.isValidForm()) {
            registerApplicant(formObj).then(e => console.log(e.regStatus)).catch(
                err => console.error(err)
            )
        } else {
            console.log("fail: Empty parts in the form")
        }
    }

    return authStatus === loginStates.LOGGED_OUT ? <RegistrationComponent {...props} /> : <Navigate to={Paths.ROOT} />
}