
class AuthCredential {
    public username: string;
    public password: string;
    public credentialType: string;

    constructor(username: string = "", password: string = "", credentialType: string = "") {
        this.username = username;
        this.password = password;
        this.credentialType = credentialType;
    }

    getRAWauthJSON():string{
      return JSON.stringify({"username":this.username, "password":this.password});
    }
}

export default AuthCredential;