import 'react-router-dom'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignUp} from "./pages/SignUp.jsx";
import {SignIn} from "./pages/SignIn.jsx";
import {DashBoard} from "./pages/DashBoard.jsx";
import {SendMoney} from "./pages/SendMoney.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path={"/signin"} element={<SignIn/>}/>
            <Route path={"/dashboard"} element={<DashBoard/>}/>
            <Route path={"/send"} element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
