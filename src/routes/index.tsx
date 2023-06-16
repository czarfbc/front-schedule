import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login"
import { Register } from "../page/register"
import { Dashboard } from "../page/dashboard"

export const RouteApp = () => {
    return( 
        <Routes>
            <Route path="/" element={
                <Login/>
            }/>
            <Route path="/register" element={
                <Register/>
            }/>
            <Route path="/dashboard" element={
                <Dashboard/>
            }/>
        </Routes>
    )
}