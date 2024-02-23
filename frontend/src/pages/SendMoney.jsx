import {Heading} from "../components/Heading.jsx";
import {RoundedIcon} from "../components/RoundedIcon.jsx";
import {LabelInput} from "../components/LabelInput.jsx";
import {Button} from "../components/Button.jsx";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {ErrorIndicator} from "../components/ErrorIndicator.jsx";

export const SendMoney = ()=>{
    const [amount , setAmount] = useState(0);
    const [transactionIndicator, setTransactionIndicator] = useState("");
    const [color, setColor] = useState("text-green-500");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    return(
        <div className={"flex h-screen bg-slate-300 justify-center items-center"}>
            <div className={"bg-white items-center justify-center rounded shadow w-80 p-4"}>
                <div className={"flex justify-center p-4"}>
                    <Heading title={"Send Money"}/>
                </div>
                <div className={"flex items-center justify-start mb-4"}>
                    <RoundedIcon userInitial={name[0].toUpperCase()} backGroundColor={"bg-green-500"} textColor={"text-white"}/>
                    <h3 className={"font-bold ml-4"}>{name}</h3>
                </div>
                <LabelInput label={"Amount (in Rs.)"} placeholder={"Enter amount"} onChange={(e)=>{
                    const inputAmount = parseInt(e.target.value)
                    setAmount(isNaN(inputAmount)? 0: inputAmount)
                }}/>
                <Button label={"Initiate Transfer"} backGroundColor={"bg-green-500"} onClick={async ()=>{
                    setTransactionIndicator("")
                    setColor("text-green-500")
                    try{
                        const token = localStorage.getItem('token')
                        const data = {to : id, amount: amount};
                        const config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: 'http://localhost:3000/api/v1/account/transfer',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            data : data
                        }
                        const response = await axios.request(config)
                        setTransactionIndicator(response.data.message);
                    }
                    catch(err){
                        setColor("text-red-500");
                        if(err.response.status === 400){
                            setTransactionIndicator("Insufficient Balance");
                        }
                        else if(err.response.status === 500) {
                            setTransactionIndicator("Internal server error");
                        }
                        else {
                            setTransactionIndicator("Something went wrong");
                        }
                    }
                }}/>
                <ErrorIndicator color = {color} text={transactionIndicator}/>
            </div>
        </div>
    )
}