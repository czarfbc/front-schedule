import { Link } from 'react-router-dom'
import logo from '../../assets/logo_branca.png'
import { CgProfile } from 'react-icons/cg'
import { useState } from 'react'
import { UseAuth } from '../../hooks/auth'

export function Header() {
    const {signOut} = UseAuth()
    const [open, setOpen] = useState(false)
    return(
        <header className="flex justify-between items-center bg-primary text-white py-4 px-6 mt-6 rounded-lg shadow-[0_4px_8px_4px_rgba(0,0,0,0.3)]">
            <div>
                <Link to={'/dashboard'} className='flex items-center' >
                    <img src={logo} alt="" className='mr-2' />
                    <span>Hero HairDresses</span>
                </Link>
            </div>
            <div className='flex items-center cursor-pointer'>
                <div onClick={() => setOpen(!open)} className='relative flex items-center'>
                    <CgProfile size={20} />
                    <span className='ml-1'>Perfil</span>
                    {
                        open && (
                            <ul className='absolute top-[100%] right-[-1.5rem] p-0 list-none rounded-lg opacity-1 transition-all bg-primary drop-shadow-[0px_9px_4px_rgba(0,0,0,0.25)]'>
                                <Link to={'/schedules'}>
                                    <li className='py-3 px-4 hover:bg-[#64a2a4] rounded-t-lg'>Agendamentos</li>
                                </Link>
                                <li className='py-3 px-4 hover:bg-[#64a2a4]'>Editar Perfil</li>
                                <li onClick={signOut} className='py-3 px-4 hover:bg-[#64a2a4] rounded-b-lg'>Sair</li>
                            </ul>
                        )
                    }
                    
                </div>
            </div>
        </header>
    )
}