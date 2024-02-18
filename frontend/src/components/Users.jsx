import {RoundedIcon} from "./RoundedIcon.jsx";

export const Users = () => {
    const users = ["Gaurav Sawasiya", "Piyush Singh", "Ashish Yogi", "Prasanjeet Karmakar", "Rishab Sonkar"];
    return (
        <div className={"m-4"}>
            <h2 className={"font-bold text-xl"}>{"Users"}</h2>
            <input className={"px-2 py-2 w-full border rounded border-gray-300 block"} type={"text"}
                   placeholder={"Search users..."}/>
            {
                users.map(user => <User name = {user}/>)
            }
        </div>
    )
}

const User = ({name}) => {
    return (
        <div className={"flex items-center justify-between my-2"}>
            <div className={"flex items-center justify-start"}>
                <RoundedIcon userInitial={name[0].toUpperCase()}/>
                <p className={"font-semibold ml-4"}>{name}</p>
            </div>
            <button className={"bg-black text-white px-2 py-1 rounded hover:bg-slate-700"}>{"Send Money"}</button>
        </div>
    )
}