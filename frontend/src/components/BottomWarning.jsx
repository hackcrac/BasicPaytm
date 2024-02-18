import {Link} from "react-router-dom";

export const BottomWarning = ({to, text, linkText})=>{
    return (
        <div className={"flex flex-row items-center justify-center my-2"}>
            <p className={"pr-2"}>{text}</p>
            <Link className={"underline"} to={to}>{linkText}</Link>
        </div>
    )
}