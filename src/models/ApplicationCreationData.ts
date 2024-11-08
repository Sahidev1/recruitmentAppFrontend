
export interface availability {
    from_date:string,
    to_date:string
}

export interface competence_profile {
    years_of_experience: string, 
    competency: {name:string}
}

export default class ApplicationCreationData {

    availabilities: availability[];
    competencies: competence_profile[];

    constructor(){
        this.availabilities = [];
        this.competencies = [];
    }

    public addAvailability(from_date:string, to_date:string){
        this.availabilities = [...this.availabilities, {from_date:from_date, to_date:to_date} ]
    }

    public addCompetency(years_of_experience:string | number, competency_name:string){
        this.competencies = [...this.competencies, {years_of_experience: (years_of_experience as string), competency:{name:competency_name}}]
    }

    public getJSONpayload(): { application: any } {
        return {
          application: {
            availabilities: this.availabilities,
            competence_profiles: this.competencies
          }
        };
      }
}