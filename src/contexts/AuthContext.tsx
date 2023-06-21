import { ReactNode, createContext } from "react";
import { api } from "../server";
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IAuthProvider {
    children: ReactNode
}
interface IAuthContextData {
    signIn: ({email, password}: ISignIn) => void
    signOut: () => void
}
interface ISignIn {
    email: string
    password: string
}

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({children}: IAuthProvider) {
    const navigate = useNavigate()
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

            navigate('/dashboard')
            return data
        } catch (error) {
            console.log("🚀 ~ file: AuthContext.tsx:37 ~ signIn ~ error:", error)
            
            if(isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }else{
                toast.error('Não foi possível fazer o login. Tente mais tarde')
            }
        }
    }
    function signOut() {
        localStorage.removeItem('token:semana-heroi')
        localStorage.removeItem('refresh_token:semana-heroi')
        localStorage.removeItem('user:semana-heroi')
        navigate('/')
    }
    return(
        <AuthContext.Provider value={{ signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}