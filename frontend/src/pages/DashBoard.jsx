import {NavBar} from "../components/NavBar.jsx";
import {Balance} from "../components/Balance.jsx";
import {Users} from "../components/Users.jsx"

export const DashBoard = ()=>{
    return(
        <div>
            <NavBar userInitial={"U"}/>
            <Balance amount={1000000}/>
            <Users/>
        </div>
    )
}