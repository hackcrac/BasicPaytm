import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {LabelInput} from "../components/LabelInput.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";

export const SignUp = ()=>{
    return(
        <div className={"flex h-screen bg-slate-300 justify-center items-center"}>
            <div className={"bg-white justify-center rounded shadow w-80 p-4"}>
                <div className={"text-center"}>
                    <Heading title={"Sign Up"}/>
                    <SubHeading title={"Enter your information to create an account"}/>
                </div>
                <LabelInput label={"First Name"} type={"text"} placeholder={"John"}/>
                <LabelInput label={"Last Name"} type={"text"} placeholder={"Doe"}/>
                <LabelInput label={"Email"} type={"text"} placeholder={"example@gmail.com"}/>
                <LabelInput label={"Password"} type={"password"} placeholder={"123456"}/>
                <Button label={"Sign Up"} onClick={() => {
                }}/>
                <BottomWarning to={"/signin"} text={"Already have an account?"} linkText={"Sign in"}/>
            </div>
        </div>
    )
}