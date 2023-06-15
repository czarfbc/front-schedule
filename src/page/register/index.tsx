import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BsPersonBadge } from 'react-icons/bs'
import { api } from '../../server'

interface IFormValues {
    name: string;
    email: string;
    password: string;
}
export function Register() {
    const schema = yup.object().shape({
        name: yup.string().required('Campo de nome obrigatório'),
        email: yup.string().email('Digite um email válido').required('Campo de email obrigatório'),
        password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Campo de senha obrigatório'),
    })
    const { register, handleSubmit, formState: {errors} } = useForm<IFormValues>({resolver: yupResolver(schema)})
    const submit = handleSubmit(async (data) => {
        const result = await api.post('/users', {
            name: data.name,
            email: data.email,
            password: data.password,
        })
        console.log("🚀 ~ file: index.tsx:31 ~ submit ~ result:", result)
    })
    return(
        <div className="h-screen bg-no-repeat bg-cover bg-[url('./assets/cadastro.webp')]">
            <div className="w-full px-4 mx-auto max-w-[1340px]">
                <p className="text-white pt-8"><Link to={'/'}>Home</Link> {'>'} Área de Cadastro</p>
                <div className='w-full flex items-center h-screen'>
                    <div className='flex w-1/2 justify-center'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='w-1/2 bg-gray-100 shadow-[0px_4px_8px_4px_rgba(0,0,0,0.2)] rounded-3xl p-12 text-center'>
                        <h2 className='text-white not-italic text-[2rem] font-light mb-8'>Área de Cadastro</h2>
                        <form onSubmit={submit}>
                            <Input 
                                placeholder='Nome' 
                                type='text'  
                                {...register('name', {required: true})} 
                                error={errors.name && errors.name.message}
                                icon={<BsPersonBadge size={20} />}
                            />
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
                            <Button text='Cadastrar'/>
                        </form>
                        <div className='text-left mt-4'>
                            <span className='text-white font-light text-sm'>Já tem cadastro <Link to={'/'} className='text-white underline'>Voltar à página inicial</Link> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}