import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login"
import { Register } from "../page/register"

export const RouteApp = () => {
    return( 
        <Routes>
            <Route path="/" element={
                <Login/>
            }/>
            <Route path="/register" element={
                <Register/>
            }/>
        </Routes>
    )
}