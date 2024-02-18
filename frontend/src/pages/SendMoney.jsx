import {Heading} from "../components/Heading.jsx";
import {RoundedIcon} from "../components/RoundedIcon.jsx";
import {LabelInput} from "../components/LabelInput.jsx";
import {Button} from "../components/Button.jsx";

export const SendMoney = ()=>{
    const name = "Gaurav Sawasiya";
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
                <LabelInput label={"Amount (in Rs.)"} placeholder={"Enter amount"}/>
                <Button label={"Initiate Transfer"} backGroundColor={"bg-green-500"} onClick={()=>{}}/>
            </div>
        </div>
    )
}