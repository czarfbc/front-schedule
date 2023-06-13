import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

interface IInput {
    placeholder: string;
    type: string;
}
export const Input = ({placeholder, type}: IInput) => {
    return(
        <div className="flex flex-wrap w-full items-center mb-6">
            <label htmlFor="" className="relative w-full flex items-center">
                <i aria-hidden="true" className="absolute pl-2 left-0 flex items-center">
                    <AiOutlineMail size={20} />
                </i>
                <input type={type} name="" id="" placeholder={placeholder} className='w-full py-[0.7rem] px-[2.2rem] rounded-lg border-[1px] border-gray-50 border-solid bg-white text-base' />
            </label>
        </div>
    )
}