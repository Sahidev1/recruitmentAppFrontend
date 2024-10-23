

export interface applicationEditorProps{
    callback: ()=>void
    displayCurrApp: boolean
}

export default function ApplicationEditor(props:applicationEditorProps){
    
    return <div id="application-editor" className="application-editor">
        <div id="curr-app">
            <button onClick={props.callback}>clickme</button>
        </div>
    </div>
}