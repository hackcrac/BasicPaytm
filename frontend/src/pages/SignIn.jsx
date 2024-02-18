import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {LabelInput} from "../components/LabelInput.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";

export const SignIn = ()=>{
    return (
        <div className={"flex h-screen bg-slate-300 justify-center items-center"}>
            <div className={"bg-white justify-center rounded shadow w-80 p-4"}>
                <div className={"text-center"}>
                    <Heading title={"Sign In"}/>
                    <SubHeading title={"Enter your credential to access your account"}/>
                </div>
                <LabelInput label={"Email"} type={"text"} placeholder={"example@gmail.com"}/>
                <LabelInput label={"Password"} type={"password"} placeholder={"123456"}/>
                <Button label={"Sign In"} onClick={() => {
                }}/>
                <BottomWarning to={"/signup"} text={"Don't have an account?"} linkText={"Sign Up"}/>
            </div>
        </div>
    )
}