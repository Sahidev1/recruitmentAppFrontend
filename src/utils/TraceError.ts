import typeOfTypes from "../enums/typeOfTypes";


export default class TraceError extends Error {

    constructor(errMsg: string, cause?: unknown) {
        if (typeof cause === typeOfTypes.STRING) super(errMsg, {cause: cause})
        else super(errMsg, { cause: cause as TraceError});
    }

    Trace(): string {

        let errMsg = ``;
        let curr:TraceError|undefined = this;
        let level = 0;
        const spaceIncr = "  ";
        let space = "";
        while (curr){
            errMsg += `${space}*Level ${level++} error:\n${space}${curr.message}`;

            if(!curr.cause){
                space+=spaceIncr;
                errMsg += `\n${space}***Root Cause: ${curr}`;
                curr = undefined;
            } 
            else curr = curr.cause as TraceError|undefined;
            errMsg+=`\n`;
            space+=spaceIncr;
        }

        return errMsg;
    }

    stackTrace(): string|undefined {
        return this.stack;
    }
}