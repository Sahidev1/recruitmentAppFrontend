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
    const forceRender = useDumbRerenderer(); // This only render this component
    console.log("post-render")
    const pickedComp = useRef<string | null>(null);
    const pickedYears = useRef<HTMLInputElement>(null);
    const fromDate = useRef<HTMLInputElement>(null);
    const toDate = useRef<HTMLInputElement>(null);
    const tempv = useRef<tempPayload>({
        competency_profiles:  [],
        availabilities: []
    });

    props.currApp?.competence_profiles.forEach(e => {console.log(e)});

    const addComp = () => {
        const comp = pickedComp.current;
        const yoe = pickedYears.current?.value;

        if (!comp || !yoe) return;

        // Check existing competencies in currApp
        if (props.currApp?.competence_profiles) {
            const existingIndex = props.currApp.competence_profiles.findIndex(
                (profile) => profile && profile.competency && profile.competency.name === comp
            );
            
            if (existingIndex !== -1) {
                // Update existing competency
                if (props.currApp.competence_profiles[existingIndex]) {
                    props.currApp.competence_profiles[existingIndex].years_of_experience = yoe;
                    forceRender();
                    return;
                }
            }
        }

        // Check temporary competencies
        const tempIndex = tempv.current.competency_profiles.findIndex(
            (profile) => profile && profile.competency && profile.competency.name === comp
        );

        if (tempIndex !== -1) {
            tempv.current.competency_profiles[tempIndex].years_of_experience = yoe;
            forceRender();
            return;
        }

        // Add new competency
        tempv.current.competency_profiles.push({
            competency: { name: comp },
            years_of_experience: yoe
        });
        forceRender();
    }

    const addAvail = () => {
        let from = fromDate.current?.value;
        let to = toDate.current?.value;
        const dbAvails = props.currApp?.availabilities?props.currApp?.availabilities:[];
        if (from && to) {
            if([...tempv.current.availabilities, ...dbAvails].find(e => e.from_date === from && e.to_date === to) !== undefined) return;
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
                    {props.currApp?.availabilities.map((e,i) => {
                        return (<tr>
                            <td> {e.from_date}</td>
                            <td> {e.to_date}</td>
                            <button className="delete-button" onClick={()=>{delete props.currApp?.availabilities[i]
                            forceRender()
                            } }>X</button>
                        </tr>);
                    })}
                    {tempv.current.availabilities.map((e,i) => {
                        return (<tr>
                            <td> {e.from_date}</td>
                            <td> {e.to_date}</td>
                            <button className="delete-button" onClick={()=>{delete tempv.current.availabilities[i];
                            forceRender();
                            } }>X</button>
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
                    {props.currApp?.competence_profiles.map((e,i) => {
                        return (<tr>
                            <td> {e.years_of_experience}</td>
                            <td> {e.competency.name}</td>
                            <button className="delete-button" onClick={()=>{delete props.currApp?.competence_profiles[i];
                            forceRender();
                            }}>X</button>
                        </tr>);
                    })}
                    {tempv.current.competency_profiles.map((e,i) => {
                        return (<tr>
                            <td> {e.years_of_experience}</td>
                            <td> {e.competency.name}</td>
                            <button className="delete-button" onClick={()=>{delete tempv.current.competency_profiles[i];
                                forceRender();
                            }}>X</button>
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