import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Props, StateTuple, priMap } from "../interfaces/Props";
import { Navigate } from "react-router-dom";
import { loginStates } from "../enums/enums";


export interface loggedOutPortalProps{
    stateTuple:StateTuple<string>,
    primitiveProps:{
        user:string,
        loginStatus: number
    }
}

export default function LoggedOutPortal (){
    return (
        <>{
            <div>
                <p>Hello this is the main portal</p>
               
            </div>
        }</>
    );
}