import { useForm } from 'react-hook-form'
import logo from '../../assets/logo.webp'
import { Input } from '../../components/input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormValues {
    email: string;
    password: string;
}
export function Login() {
    const schema = yup.object().shape({
        email: yup.string().email('Digite um email válido').required('Campo de email obrigatório'),
        password: yup.string().required('Campo de senha obrigatório'),
    })
    const { register, handleSubmit } = useForm<IFormValues>({resolver: yupResolver(schema)})
    const submit = handleSubmit((data) => {
        console.log("🚀 ~ file: index.tsx:18 ~ submit ~ data:", data)

    })
    return(
        <div className="h-screen bg-no-repeat bg-cover bg-[url('./assets/background_login.webp')] flex items-center">
            <div className="w-full px-4 mx-auto max-w-[1340px] justify-end flex">
                <div className='w-1/2 flex flex-wrap flex-col p-8'>
                    <div className='flex justify-center'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='bg-gray-100 shadow-[0px_4px_8px_4px_rgba(0,0,0,0.2)] rounded-3xl p-12 text-center'>
                        <h2 className='text-white not-italic text-[2rem] font-light mb-8'>Olá, seja bem vindo</h2>
                        <form onSubmit={submit}>
                            <Input 
                                placeholder='Email' 
                                type='email' 
                                {...register('email', {required: true})} 
                            />
                            <Input 
                                placeholder='Senha' 
                                type='password'
                                {...register('password', {required: true})} 
                            />
                            <button type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}