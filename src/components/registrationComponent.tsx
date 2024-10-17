

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
    onSubmit?: (event:React.FormEvent<HTMLFormElement>) => void
}


export default function RegistrationComponent(props:registrationComponentProps){
 
    return (<div className="registrationForm_container">
        <form id="reg_form" onSubmit={props.onSubmit}>
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