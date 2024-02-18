export const Button = ({label, backGroundColor = "bg-black",onClick})=>{
    return (
        <button className={`w-full px-2 py-1 my-2 ${backGroundColor} text-white rounded hover:bg-slate-700`} onClick={onClick}>{label}</button>
    )
}
