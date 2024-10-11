import { useLocation } from "react-router-dom";
import { Location } from "react-router-dom";

export interface navigationComponentProps{
    callbacks:({descriptor:string,cb:() => void})[]
}

export default function NavigationComponent(props:navigationComponentProps){

    return <>
        {props.callbacks.map((v,i) => {
            return <button key={i} onClick={v.cb}> {v.descriptor}</button>
        })
        }
    </>
}