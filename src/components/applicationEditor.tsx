import { useRef, useState } from "react"
import OwnApplicationResponse from "../models/OwnApplicationResponse"
import { availability, competence_profile } from "../models/ApplicationCreationData"
import useDumbRerenderer from "../costumHooks/rerender"


export interface applicationEditorProps {
    displayCurrApp: boolean
    callback: () => void
    currApp: OwnApplicationResponse | null,
    competencyList: { id: number, name: string }[] | null
}

export interface tempPayload {
    competency_profiles: competence_profile[],
    availabilities: availability[]
}

export default function ApplicationEditor(props: applicationEditorProps) {
    const [showComp, setShowComp] = useState<boolean>(false);
    const [showAvail, setShowAvail] = useState<boolean>(false);

    console.log("pre-render")
    const forceRender = useDumbRerenderer();
    console.log("post-render")
    const pickedComp = useRef<string | null>(null);
    const pickedYears = useRef<HTMLInputElement>(null);
    const fromDate = useRef<HTMLInputElement>(null);
    const toDate = useRef<HTMLInputElement>(null);
    const tempv = useRef<tempPayload>({
        competency_profiles: [],
        availabilities: []
    });

    const addComp = () => {
        let comp = pickedComp.current;
        let yoe = pickedYears.current?.value;
        if (comp && yoe) {
            tempv.current.competency_profiles.push({
                competency: { name: comp ? comp : "" },
                years_of_experience: yoe ? yoe : "0"
            })
            forceRender();
        }
    }
    const addAvail = () => {
        let from = fromDate.current?.value;
        let to = toDate.current?.value;
        if (from && to) {
            tempv.current.availabilities.push({
                from_date: from,
                to_date: to
            })
            forceRender();
        }
    }

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
                    {tempv.current.availabilities.map((e) => {
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
                    {tempv.current.competency_profiles.map((e) => {
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
                <select onChange={e => pickedComp.current = e.target.value}>
                    <option disabled selected>--- Select a competency ---</option>
                    {props.competencyList?.map((e) => {
                        return <option value={e.name}>{e.name}</option>
                    })}

                </select>
                <label> years of experience: </label>
                <input type="number" ref={pickedYears} />
                <button onClick={() => { addComp() }}>add</button>

            </div>
        </div>
        <div id="availabilityBox" >
            <button onClick={() => setShowAvail(!showAvail)}>{showAvail ? "hide" : "add availability"}</button>
            <div hidden={!showAvail}>
                <label>from date: </label>
                <input type="date" ref={fromDate} />
                <label>to date: </label>
                <input type="date" ref={toDate} />
                <button onClick={() => addAvail()}>add</button>
            </div>
        </div>
    </div>
}