import {NavBar} from "../components/NavBar.jsx";
import {Balance} from "../components/Balance.jsx";
import {Users} from "../components/Users.jsx"
import {useEffect, useState} from "react";
import axios from "axios";

export const DashBoard = () => {
    const [amount, setAmount] = useState(0);
    const [name , setName] = useState("User");
    useEffect(() => {
        const token = localStorage.getItem("token");
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/account/balance',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.request(config).then((response) => {
            setAmount(response.data.balance);
            setName(response.data.firstName);
            console.log(response.data)
        }).catch((err) => {
            console.log(`Error in fetching the balance: ${err}`)
        })
    }, []);
    return (
        <div>
            <NavBar name={name}/>
            <Balance amount={amount}/>
            <Users/>
        </div>
    )
}