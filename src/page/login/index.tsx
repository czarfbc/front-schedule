import { useForm } from 'react-hook-form'
import logo from '../../assets/logo.webp'
import { Input } from '../../components/input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { api } from '../../server'
import { UseAuth } from '../../hooks/auth';

interface IFormValues {
    email: string;
    password: string;
}
export function Login() {
    const {signIn} = UseAuth()
    const navigate = useNavigate()
    const schema = yup.object().shape({
        email: yup.string().email('Digite um email válido').required('Campo de email obrigatório'),
        password: yup.string().required('Campo de senha obrigatório'),
    })
    const { register, handleSubmit, formState: {errors} } = useForm<IFormValues>({resolver: yupResolver(schema)})
    const submit = handleSubmit(async ({email, password}) => {
        const response = await signIn({email, password})
        navigate//('/dashboard')
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
                            <span className='text-white font-light text-sm'>Ainda não tem conta? <Link to={'/register'} className='text-white underline'>Cadastre-se</Link> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}