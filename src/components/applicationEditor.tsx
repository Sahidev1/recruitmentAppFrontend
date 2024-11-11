import { useRef, useState } from "react"
import OwnApplicationResponse from "../models/OwnApplicationResponse"


export interface applicationEditorProps {
    displayCurrApp: boolean
    callback: () => void
    currApp: OwnApplicationResponse | null,
    competencyList: { id: number, name: string }[] | null
}

export default function ApplicationEditor(props: applicationEditorProps) {
    const [showComp, setShowComp] = useState<boolean>(false);
    const  pickedComp = useRef<string | null>(null);
    const pickedYears = useRef<number | null>(null);

    return <div id="application-editor" className="application-editor">
        {!props.displayCurrApp && <p> No application found</p>}
        <div id="curr-app" hidden={!props.displayCurrApp}>
            <p> Current Application: </p>
            <p> name: {props.currApp?.name}</p>
            <p> surname: {props.currApp?.surname}</p>
            <p> personal number: {props.currApp?.pnr}</p>
            <p> email: {props.currApp?.email}</p>

            <table>
                <caption>Availabilities</caption>
                <thead>
                    <tr>
                        <th scope="col">from date</th>
                        <th scope="col">to date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currApp?.availabilities.map((e) => {
                        return (<tr>
                            <td> {e.from_date}</td>
                            <td> {e.to_date}</td>
                        </tr>);
                    })}
                </tbody>
            </table>

            <table>
                <caption>Competence Profiles</caption>
                <thead>
                    <tr>
                        <th scope="col">years of experience</th>
                        <th scope="col">competency</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currApp?.competence_profiles.map((e) => {
                        return (<tr>
                            <td> {e.years_of_experience}</td>
                            <td> {e.competency.name}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
        <div id="competencyBox">
            <button onClick={() => setShowComp(!showComp)}>{showComp ? "hide" : "add competency"}</button>
            <div hidden={!showComp}>
                <label>Comptency: </label>    
                <select onChange={e=>pickedComp.current = e.target.value}>
                    {props.competencyList?.map((e) => {
                        return <option value={e.name}>{e.name}</option>
                    })}
                </select>
                <label> years of experience: </label>
                <input type="number" />
                <button onClick={()=>console.log(pickedComp.current)}>add</button>
            
            </div>
        </div>
    </div>
}