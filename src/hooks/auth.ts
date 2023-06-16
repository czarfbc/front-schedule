import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function UseAuth() {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error('useAuth is no in AuthProvider')
    }
    return context
}