import TraceError from "../utils/TraceError";

export interface availability {
    availabilities_id?: number,
    from_date:string,
    to_date:string
}

export interface competence_profile {
    competence_profile_id?: number,
    years_of_experience: string, 
    competency: {name:string}
}

export default class ApplicationCreationData {

    availabilities: availability[];
    competencies: competence_profile[];

    constructor(availabilities?: availability[], competencies?: competence_profile[]){
        this.availabilities = availabilities || [];
        this.competencies = competencies || [];
    }

    public addAvailability(from_date:string, to_date:string){
        this.availabilities = [...this.availabilities, {from_date:from_date, to_date:to_date} ]
    }

    public addCompetency(years_of_experience:string | number, competency_name:string){
        this.competencies = [...this.competencies, {years_of_experience: (years_of_experience as string), competency:{name:competency_name}}]
    }

    public getJSONpayload(): { application: any } {
        try {
           /* const tempAvails = this.availabilities.map(e => {
                return {from_date:e.from_date, to_date: e.to_date};
            })
            const comps = this.competencies.map(e => {
                return {years_of_experience: e.years_of_experience, competency: {name: e.competency.name}};
            })
    
            console.log(JSON.stringify(tempAvails));
            console.log(JSON.stringify(comps)); */
    
            const payload:{application:any} = {
                application: {
                  availabilities: this.availabilities,
                  competence_profiles: this.competencies
                }
              };
            console.log(JSON.stringify(payload))
    
            return payload;
        } catch (error) {
            throw new TraceError(`get json payload error`, error);
        }
    }
}