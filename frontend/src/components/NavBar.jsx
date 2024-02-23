import {RoundedIcon} from "./RoundedIcon.jsx";

export const NavBar = ({name})=>{
    return(
        <div>
            <div className={"flex items-center justify-between m-4"}>
                <h1 className={"text-3xl font-bold"}>{"Payments App"}</h1>
                <div className={"flex items-center justify-end"}>
                    <p className={"text-xl mr-4"}>{`Hello, ${name}`}</p>
                    <RoundedIcon userInitial={name[0].toUpperCase()}/>
                </div>
            </div>
            <hr/>
        </div>
    )
}