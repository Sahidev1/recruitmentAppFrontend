import { useState } from "react";


export default function useDumbRerenderer(){
    const [count, setCount] = useState<number>(0);

    return (()=>setCount(cnt => cnt + 1));
}