
import { availability, competence_profile } from "./ApplicationCreationData"

export default class OwnApplicationResponse {
    name:string;
    surname:string;
    pnr:string;
    email:string;
    availabilities:availability[]
    competence_profiles:competence_profile[]

    constructor(name:string, surname:string, pnr: string, email: string,av:availability[], ca:competence_profile[]){
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.availabilities = av;
        this.competence_profiles = ca;
    }
}