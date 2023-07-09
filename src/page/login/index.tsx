import { useForm } from 'react-hook-form'
import logo from '../../assets/logo.webp'
import { Input } from '../../components/input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/button';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { UseAuth } from '../../hooks/auth';

interface IFormValues {
    email: string;
    password: string;
}
export function Login() {
    const {signIn} = UseAuth()
    
    const schema = yup.object().shape({
        email: yup.string().email('Digite um email válido').required('Campo de email obrigatório'),
        password: yup.string().required('Campo de senha obrigatório'),
    })
    const { register, handleSubmit, formState: {errors} } = useForm<IFormValues>({resolver: yupResolver(schema)})
    const submit = handleSubmit(async ({email, password}) => {
        try {
            signIn({email, password})
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:29 ~ submit ~ error:", error)            
        }
    })
    return(
        <div className="h-screen bg-no-repeat bg-cover bg-[url('./assets/background_login.webp')] flex items-center">
            <div className="w-full px-4 mx-auto max-w-[1340px] justify-end flex">
                <div className='w-full flex flex-col justify-evenly items-center h-screen xl:flex-row'>
                    <div className='flex sm:w-1/5 md:w-1/3 xl:w-1/2 justify-center'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='w-1/2 bg-gray-100 shadow-[0px_4px_8px_4px_rgba(0,0,0,0.2)] rounded-3xl sm:px-4 sm:py-8 md:p-12 text-center'>
                        <h2 className='text-white not-italic sm:text-xl lg:text-3xl font-light mb-8'>Olá, seja bem vindo</h2>
                        <form onSubmit={submit}>
                            <Input 
                                placeholder='Email' 
                                type='email'  
                                {...register('email', {required: true})} 
                                error={errors.email && errors.email.message}
                                icon={<AiOutlineMail size={20} />}
                            />
                            <Input 
                                placeholder='Senha' 
                                type='password'
                                {...register('password', {required: true})} 
                                error={errors.password && errors.password.message}
                                icon={<RiLockPasswordLine size={20} />}
                            />
                            <Button text='Entrar'/>
                        </form>
                        <div className='text-left mt-4'>
                            <span className='text-white font-light sm:text-[0.65rem] md:text-sm'>Ainda não tem conta? <Link to={'/register'} className='text-white underline'>Cadastre-se</Link> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}