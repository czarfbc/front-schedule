import { Route, Routes } from "react-router-dom"

export const RouteApp = () => {
    return( 
        <Routes>
            <Route path="/" element={
                <>
                    <h1>login</h1>
                </>
            }/>
            <Route path="/register" element={
                <>
                    <h1>sssss</h1>
                </>
            }/>
        </Routes>
    )
}