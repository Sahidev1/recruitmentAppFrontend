
enum credentialTypes{
    APPLICANT="applicant",
    RECRUITER="recruiter"
}


enum loginStates {
    LOGGED_OUT,
    APPLICANT_LOGGED_IN,
    RECRUITER_LOGGED_IN
};

enum userRole {
    UNKNOWN,
    RECRUITER,
    APPLICANT
}

enum authStatus {
    UNAUTHORIZED ="Unauthorized",
    AUTHORIZED = "Authorized"
}

enum fetchStatus {
    SUCCESS,
    FAIL,
    ERROR,
    UNDEFINED
}

export  {credentialTypes, loginStates, userRole, authStatus, fetchStatus};