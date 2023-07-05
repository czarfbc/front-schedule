import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { UseAuth } from "../hooks/auth"

interface IPrivateRoute {
    children: ReactNode
}
const PrivateRoute: React.FC<IPrivateRoute> = ({children}) => {
    const {isAutheticated} = UseAuth()
    if(!isAutheticated) {
        return <Navigate to={'/'} />
    }
    return <>{children}</>
}

export {PrivateRoute}