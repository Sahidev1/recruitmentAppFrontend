import { useRef } from "react";
import RegistrationComponent, { registrationComponentProps } from "../components/registrationComponent";


export default function Registration(){
    const props:registrationComponentProps = {inputs:[{type:"text", description:"username", reference:useRef<HTMLInputElement>(null)}]};
    props.inputs.push({type:"password", description:"password", reference:useRef<HTMLInputElement>(null)});
    props.inputs.push({type:"text", description:"personal number", reference:useRef<HTMLInputElement>(null)});
    props.inputs.push({type:"text", description:"email", reference:useRef<HTMLInputElement>(null)});
    props.inputs.push({type:"text", description:"name", reference:useRef<HTMLInputElement>(null)});
    props.inputs.push({type:"text", description:"surname", reference:useRef<HTMLInputElement>(null)});

    props.onSubmit = (event)=>{
        event.preventDefault();
        props.inputs.forEach(i => {
            console.log(`${i.description}: ${i.reference.current?.value}`);
        })
    }

    return <RegistrationComponent {...props}/>
}