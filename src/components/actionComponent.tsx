
export interface actionComponentProps {
    buttons: ({ description: string, callback: () => Promise<void> })[]
}

export default function ActionComponent(props: actionComponentProps) {


    return (<>
        {props.buttons.map((v) => {
            return <button key={v.description} onClick={v.callback}>{v.description}</button>
        })}
    </>)
}