import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {LabelInput} from "../components/LabelInput.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ErrorIndicator} from "../components/ErrorIndicator.jsx";

export const SignIn = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [color, setColor] = useState("text-green-500");
    const [signInIndicator, setSignInIndicator] = useState("");
    return (
        <div className={"flex h-screen bg-slate-300 justify-center items-center"}>
            <div className={"bg-white justify-center rounded shadow w-80 p-4"}>
                <div className={"text-center"}>
                    <Heading title={"Sign In"}/>
                    <SubHeading title={"Enter your credential to access your account"}/>
                </div>
                <LabelInput label={"Email"} type={"text"} placeholder={"example@gmail.com"} onChange={(e) => {
                    setUserName(e.target.value);
                }}/>
                <LabelInput label={"Password"} type={"password"} placeholder={"123456"} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <Button label={"Sign In"} onClick={async () => {
                    setSignInIndicator("");
                    setColor("text-green-500");
                    try {
                        const data = {
                            username: userName,
                            password
                        }
                        const config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: 'http://localhost:3000/api/v1/user/signin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        }
                        const response = await axios.request(config)
                        const token = response.data.token;
                        localStorage.setItem("token", token);
                        navigate("/dashboard");

                    } catch (err) {
                        setColor("text-red-500");
                        if (err.response.status === 411) {
                            setSignInIndicator("Incorrect Inputs / Error while logging in");
                        } else if (err.response.status === 500) {
                            setSignInIndicator("Internal server error");
                        } else {
                            setSignInIndicator("Something went wrong");
                        }
                    }
                }}/>
                <BottomWarning to={"/signup"} text={"Don't have an account?"} linkText={"Sign Up"}/>
                <ErrorIndicator color={color} text={signInIndicator}/>
            </div>
        </div>
    )
}