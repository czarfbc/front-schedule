import { RiDeleteBinLine } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { isAfter } from "date-fns";
import style from './card.module.css'
import { useState } from "react";
import { ModalEdit } from "../modalEdit";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../server";

interface ISchedules {
    id: string;
    name: string;
	phone: string;
	date: Date;
}
export const Card = ({id, name, date, phone}: ISchedules) => {
    const isAfterDate = isAfter(new Date(date), new Date())
    const [openModal, setOpenModal] = useState<boolean>(false) 

    const dateFormatted = new Date(date)
    const hourMinutesFormatted = dateFormatted
    const hourMinutesValues = hourMinutesFormatted.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const hour = hourMinutesValues.split(':')[0]
    const minutes = hourMinutesValues.split(':')[1]

    let phoneFormatted = phone.replace(/\D/g, '')
    phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')

    const handleChangeModal = () => {
        setOpenModal(!openModal)
    } 
    const handleDelete = async () => {
        try {
          const result = await api.delete(`/schedules/${id}`);
          toast.success('Deletado com sucesso');
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
          }
        }
    }
    return(
        <>
            <div className="flex mx-4 sm:w-auto md:w-full lg:w-auto bg-white rounded-lg justify-between items-center mb-5 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.3)]">
                <div className="flex gap-2 items-center">
                    <span className={`${!isAfterDate && style.oldHour} md:text-sm lg:text-xl bg-secondary text-white rounded-s-lg p-[0.8rem] md:mr-4 lg:mr-8`}>
                        {hour}:{minutes}h
                    </span>
                    <p className="text-primary md:text-sm lg:text-xl">{name} - {phoneFormatted}</p>
                </div>
                <div className="flex mx-2 gap-2">
                    <AiOutlineEdit 
                        size={20} 
                        color="#5F68B1" 
                        onClick={() => isAfterDate && handleChangeModal()} 
                        className="cursor-pointer" 
                    />
                    <RiDeleteBinLine 
                        size={20} 
                        color="#EB2E2E" 
                        onClick={() => isAfterDate && handleDelete()} 
                        className="cursor-pointer" 
                    />
                </div>
            </div>
            <ModalEdit 
                isOpen={openModal} 
                handleChangeModal={handleChangeModal} 
                hour={String(hour)} 
                minutes={String(minutes)} 
                name={name} 
                id={id} 
            />
        </>
    )
}