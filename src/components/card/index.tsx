import { RiDeleteBinLine } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { getHours, isAfter } from "date-fns";

interface ISchedules {
    id: string;
    name: string;
	phone: string;
	date: Date;
}
export const Card = ({id, name, date, phone}: ISchedules) => {
    const isAfterDate = isAfter(new Date(date), new Date())
    let phoneFormatted = phone.replace(/\D/g, '')
    phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    return(
        <div className="flex bg-white rounded-lg justify-between items-center mb-5 shadow-[0_4px_8px_4px_rgba(0,0,0,0.3)]">
            <div className="flex items-center">
                <span className={`${!isAfterDate && "bg-gray-300"} bg-secondary text-white rounded-s-lg p-[0.8rem] mr-8`}>{getHours(new Date(date))}h</span>
                <p className="text-primary text-xl">{name} - {phoneFormatted}</p>
            </div>
            <div className="flex mr-2 gap-2">
                <AiOutlineEdit size={20} color="#5F68B1" />
                <RiDeleteBinLine size={20} color="#EB2E2E" />
            </div>
        </div>
    )
}