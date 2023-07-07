import { ForwardRefRenderFunction, forwardRef } from 'react';

interface IInput {
    type: 'password' | 'email' | 'date' | 'text' | 'number';
    error?: string;
    label: string
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = ({type, error, label, ...rest}, ref) => {
    const currentValue = new Date().toISOString().split('T')[0]
    return(
        <div className="flex flex-col mb-2">
            <label className="relative w-full flex items-center text-primary">
                {label}
            </label>
            <input 
                name="" 
                id="" 
                ref={ref} 
                type={type} 
                {...rest}
                min={currentValue}
                className='w-full p-2 rounded-2xl border-[1px] border-primary border-solid bg-white bg-opacity-0 text-base' 
            />
            {error && <span className='text-[#ff0000] font-bold'>{error}</span>}
        </div>
    )
}

export const InputSchedule = forwardRef(InputBase)