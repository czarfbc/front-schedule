import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login"
import { Register } from "../page/register"
import { Dashboard } from "../page/dashboard"
import { Schedules } from "../page/schedules"
import { PrivateRoute } from "./privateRoute"

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
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path="/schedules" element={
                <PrivateRoute>    
                    <Schedules/>
                </PrivateRoute>
            }/>
        </Routes>
    )
}