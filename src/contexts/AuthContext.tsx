import { ReactNode, createContext } from "react";
import { api } from "../server";
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface IAuthProvider {
    children: ReactNode
}
interface IAuthContextData {
    signIn: ({email, password}: ISignIn) => void
}
interface ISignIn {
    email: string
    password: string
}

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({children}: IAuthProvider) {
    async function signIn({ email, password }: ISignIn) {
        try {
            const {data} = await api.post('/users/auth', {
                email,
                password,
            })
            const {token, refresh_token, user} = data
            const userData= {
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
            }
            localStorage.setItem('token:semana-heroi', token)
            localStorage.setItem('refresh_token:semana-heroi', refresh_token)
            localStorage.setItem('user:semana-heroi', JSON.stringify(userData))
            toast.success(`Seja bem vindo(a), ${userData.name}`)
            return data
        } catch (error) {
            console.log("🚀 ~ file: AuthContext.tsx:37 ~ signIn ~ error:", error)
            
            if(isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        }
    }
    return(
        <AuthContext.Provider value={{ signIn }}>
            {children}
        </AuthContext.Provider>
    )
}