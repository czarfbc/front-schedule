import { RiDeleteBinLine } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { getHours, isAfter } from "date-fns";
import style from './card.module.css'
import { useState } from "react";
import { ModalEdit } from "../modalEdit";

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
    const hour = getHours(dateFormatted) 
    console.log("🚀 ~ file: index.tsx:20 ~ Card ~ hour:", hour)

    let phoneFormatted = phone.replace(/\D/g, '')
    phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')

    const handleChangeModal = () => {
        setOpenModal(!openModal)
    } 
    return(
        <>
            <div className="flex bg-white rounded-lg justify-between items-center mb-5 shadow-[0_4px_8px_4px_rgba(0,0,0,0.3)]">
                <div className="flex items-center">
                    <span className={`${!isAfterDate && style.oldHour} bg-secondary text-white rounded-s-lg p-[0.8rem] mr-8`}>
                        {hour}h
                    </span>
                    <p className="text-primary text-xl">{name} - {phoneFormatted}</p>
                </div>
                <div className="flex mr-2 gap-2">
                    <AiOutlineEdit size={20} color="#5F68B1" onClick={() => isAfterDate && handleChangeModal()} className="cursor-pointer" />
                    <RiDeleteBinLine size={20} color="#EB2E2E" className="cursor-pointer" />
                </div>
            </div>
            <ModalEdit isOpen={openModal} handleChangeModal={handleChangeModal} hour={hour} name={name} id={id} />
        </>
    )
}