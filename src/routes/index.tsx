import { Route, Routes } from "react-router-dom"
import { Login } from "../page/login"

export const RouteApp = () => {
    return( 
        <Routes>
            <Route path="/" element={
                <Login/>
            }/>
            <Route path="/register" element={
                <>
                    <h1>Sssss</h1>
                </>
            }/>
        </Routes>
    )
}