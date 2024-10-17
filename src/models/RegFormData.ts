
export default class RegFormData {
    /* 
{
    "username":"j",
    "password":"dags233232",
    "pnr":"19230801-1212",
    "email":"lamadSSSo23om@yahoo.com",
    "name":"pdjdjdjd",
    "surname":"djdjdjd"
}
    */
    constructor(
        public username: string | undefined,
        public password: string | undefined,
        public pnr: string | undefined,
        public email: string | undefined,
        public name: string | undefined,
        public surname: string | undefined
    ) { }

    // very basic validation making sure no form entry is empty
    // more in depth validation is handled by backend 
    public isValidForm():boolean {
        return (this.username !== undefined &&
        this.password !== undefined &&
        this.pnr !== undefined &&
        this.email !== undefined &&
        this.name !== undefined &&
        this.surname !== undefined);
    }

    public getRawJSON():any{
        return JSON.stringify({
            username:this.username,
            password:this.password,
            pnr:this.pnr,
            email:this.email,
            name:this.name,
            surname:this.surname
        });
    }
}
