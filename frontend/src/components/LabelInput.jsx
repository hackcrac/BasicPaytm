export const LabelInput = ({label, type, placeholder})=>{
    return (
        <div className={"my-2"}>
            <h3 className={"font-bold mb-1"}>{label}</h3>
            <input className={"px-2 py-1 w-full border rounded border-gray-300 block"} type={type} placeholder={placeholder}/>
        </div>
    )
}