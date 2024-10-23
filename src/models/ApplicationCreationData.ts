
/*
 * sample of data:
    {"application": {
    "name": "pango",
    "surname": "langgo",
    "pnr": "19880102-1316",
    "email": "lamado1@dontexist.com",
    "availabilities": [
        {
            "from_date": "2020-01-06",
            "to_date": "2020-07-06"
        },
        {
            "from_date": "2020-03-06",
            "to_date": "2020-08-06"
        },
        {
            "from_date": "2020-01-01",
            "to_date": "2020-02-02"
        }
    ],
    "competence_profiles": [
        {
            "years_of_experience": "0.20",
            "competency": {
                "name": "ticket sales"
            }
        },
        {
            "years_of_experience": "3.40",
            "competency": {
                "name": "lotteries"
            }
        },
        {
            "years_of_experience": "1.50",
            "competency": {
                "name": "roller coaster operation"
            }
        }
    ]
}}  
 */
interface availability {
    from_date:string,
    to_date:string
}

interface competence_profile {
    years_of_experience: string, 
    competency: {name:string}
}

export default class ApplicationCreationForm {
    name: string;
    surname: string;
    pnr: string;
    email: string;
    availabilities: availability[];
    competencies: competence_profile[];

    constructor(name:string, surname:string, pnr:string, email:string){
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.availabilities = [];
        this.competencies = [];
    }

    public addAvailability(from_date:string, to_date:string){
        this.availabilities = [...this.availabilities, {from_date:from_date, to_date:to_date} ]
    }

    public addCompetency(years_of_experience:string | number, competency_name:string){
        this.competencies = [...this.competencies, {years_of_experience: (years_of_experience as string), competency:{name:competency_name}}]
    }

    public getJSONpayload():string {
        return JSON.stringify(
            {"application": {
                "name": this.name,
                "surname": this.surname,
                "pnr": this.pnr,
                "email": this.email,
                "availabilities": this.availabilities,
                "competence_profiles": this.competencies
            }}    
        )
    }
}