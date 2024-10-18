

/*
{
    "username":,
    "password":,
    "pnr":"",
    "email":"",
    "name":
    "surname":
}

*/

export interface registrationComponentProps {
    inputs: [{type:string, description:string, reference: React.RefObject<HTMLInputElement>}]
    onSubmit?: ( event:React.FormEvent<HTMLFormElement>) => Promise<void>,
    regAttempted:boolean,
    attempCount:number,
    attemptSucceded?:boolean,
    attemptFailMessage?:string
    failureCauses?:string[]
}


export default function RegistrationComponent(props:registrationComponentProps){
    console.log(props);
    console.log("comp render")
    return (<div className="registrationForm_container">
        <span className="reg_form_success_attempt" hidden={!props.regAttempted || !props.attemptSucceded}>Registration was successfull!</span>
        <div className="reg_form_fail_box" hidden={!props.regAttempted || props.attemptSucceded}>
            <p className="main_cause">{props.attemptFailMessage}</p>
            <span className="causes">
                {props.failureCauses?.map((cause,i) => {
                    return <p key={i}>{cause}</p>
                })}
            </span>
        </div>
        <form className="reg_form" onSubmit={props.onSubmit}>
            {props.inputs.map((i,index) => {
                return (
                    <p key={index}>
                        <label>{i.description}</label>
                        <input type={i.type} ref={i.reference}></input>
                    </p>
                )
            })}
            <br/><input type="submit" value="register"/>
        </form>

    </div>);
}