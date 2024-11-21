

export interface deletion {
    descriptor:string;
    id: number
}

export default class DeleteAppData {
    private username:string;
    private deletions: deletion[];

    constructor(username:string){
        this.username = username;
        this.deletions = [];
    }


    getRAWJSON(){
        
    }
}