import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {LabelInput} from "../components/LabelInput.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ErrorIndicator} from "../components/ErrorIndicator.jsx";

export const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [color, setColor] = useState("text-green-500");
    const [signUpIndicator, setSignUpIndicator] = useState("");
    return (
        <div className={"flex h-screen bg-slate-300 justify-center items-center"}>
            <div className={"bg-white justify-center rounded shadow w-80 p-4"}>
                <div className={"text-center"}>
                    <Heading title={"Sign Up"}/>
                    <SubHeading title={"Enter your information to create an account"}/>
                </div>
                <LabelInput label={"First Name"} type={"text"} placeholder={"John"} onChange={(e) => {
                    setFirstName(e.target.value)
                }}/>
                <LabelInput label={"Last Name"} type={"text"} placeholder={"Doe"} onChange={(e) => {
                    setLastName(e.target.value)
                }}/>
                <LabelInput label={"Email"} type={"text"} placeholder={"example@gmail.com"} onChange={(e) => {
                    setUserName(e.target.value)
                }}/>
                <LabelInput label={"Password"} type={"password"} placeholder={"123456"} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <Button label={"Sign Up"} onClick={async () => {
                    setSignUpIndicator("");
                    setColor("text-green-500");
                    try {
                        const userData = {
                            username: userName,
                            firstName,
                            lastName,
                            password
                        }
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", userData)
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    } catch (err) {
                        setColor("text-red-500");
                        if (err.response.status === 411) {
                            setSignUpIndicator("Incorrect Inputs / Email already taken");
                        } else if (err.response.status === 500) {
                            setSignUpIndicator("Internal server error");
                        } else {
                            setSignUpIndicator("Something went wrong");
                        }
                    }
                }}/>
                <BottomWarning to={"/signin"} text={"Already have an account?"} linkText={"Sign in"}/>
                <ErrorIndicator color={color} text={signUpIndicator}/>
            </div>
        </div>
    )
}