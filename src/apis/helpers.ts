

async function abortableFetch (info:RequestInfo|URL, opts:RequestInit, abortAfter?:number):Promise<Response>{
    if (abortAfter) opts.signal = AbortSignal.timeout(abortAfter);
    return await fetch(info, opts);
}

export { abortableFetch }