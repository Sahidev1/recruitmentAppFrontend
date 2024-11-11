
import { availability, competence_profile } from "./ApplicationCreationData"

export default class OwnApplicationResponse {
    person_id:number;
    name:string;
    surname:string;
    pnr:string;
    email:string;
    availabilities:availability[]
    competence_profiles:competence_profile[]
    applicationstatuses?: any[]

    constructor(person_id:number, name:string, surname:string, pnr: string, email: string,av:availability[], ca:competence_profile[]){
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.availabilities = av;
        this.competence_profiles = ca;
        this.person_id = person_id;
    }
}