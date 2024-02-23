import {RoundedIcon} from "./RoundedIcon.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        const timeOut = setTimeout(() => {
            axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`).then((response) => {
                setUsers(response.data.user)
            }).catch((err) => {
                console.log(err.data)
            })
        }, 500)

        return () => {
            clearTimeout(timeOut)
        }

    }, [filter]);
    return (
        <div className={"m-4"}>
            <h2 className={"font-bold text-xl"}>{"Users"}</h2>
            <input className={"px-2 py-2 w-full border rounded border-gray-300 block"} type={"text"}
                   placeholder={"Search users..."} onChange={(e) => {
                setFilter(e.target.value)
            }}/>
            {
                filter!==""?users.map(user => <User name={user} key={user._id}/>):null
            }
        </div>
    )
}

const User = ({name}) => {
    const navigate = useNavigate();
    return (
        <div className={"flex items-center justify-between my-2"}>
            <div className={"flex items-center justify-start"}>
                <RoundedIcon userInitial={name.firstName[0].toUpperCase()}/>
                <p className={"font-semibold ml-4"}>{name.firstName + " " + name.lastName}</p>
            </div>
            <button className={"bg-black text-white px-2 py-1 rounded hover:bg-slate-700"} onClick={
                () => {
                    navigate(`/send?id=${name._id}&name=${name.firstName} ${name.lastName}`)
                }
            }>{"Send Money"}</button>
        </div>
    )
}