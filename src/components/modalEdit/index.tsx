import { AiOutlineClose } from "react-icons/ai"
import { UseAuth } from "../../hooks/auth"
import { getHours } from "date-fns"
import { useState } from "react"
import { api } from "../../server"
import { toast } from 'react-toastify';
import { isAxiosError } from "axios"

interface IModal {
    isOpen: boolean
    handleChangeModal: () => void
    name: string
    hour: number
    id: string
}
export function ModalEdit({isOpen, handleChangeModal, hour, name, id}: IModal) {
    const { availableSchedules, schedules, date, handleSetDate } = UseAuth()
    const [hourSchedule, setHourSchedule] = useState('')
    console.log("🚀 ~ file: index.tsx:19 ~ ModalEdit ~ hourSchedule:", hourSchedule)

    const currentValue = new Date().toISOString().split('T')[0]

    const  filteredDate = availableSchedules.filter((hour) => {
        const isSchedulesAvailable = !schedules.find((schedulesItem) => {
            const scheduleDate = new Date(schedulesItem.date)
            const scheduleHour = getHours(scheduleDate)
            return scheduleHour === Number(hour)
        })
        return isSchedulesAvailable
    })

    const handleChangeHour = (hour: string) => {
        setHourSchedule(hour)
    }

    const updateData = async () => {
        try {     
            await api.put(`/schedules/${id}`, {
                params: {
                    date: date,
                }
            })
            toast.success('Atualizado com sucesso')
            handleChangeModal()
        } catch (error) {
            if(isAxiosError(error)){
                toast.error(error.response?.data.message)
                console.log("🚀 ~ file: index.tsx:48 ~ updateData ~ error.response?.data.message:", error.response?.data.message)
            }
        }
    }

    if(isOpen){
        return(
            <div className="fixed inset-0 bg-black bg-opacity-30 z-10">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-2xl">
                    <div className="bg-primary rounded-t-2xl text-white flex justify-between p-8">
                        <h2 className="text-2xl font-bold">Editar Horário</h2>
                        <AiOutlineClose size={25} className="cursor-pointer" onClick={handleChangeModal} />
                    </div>
                    <div className="py-4 px-8">
                        <p className="text-secondary text-2xl mb-3">{hour}h {name}</p>

                        <div className="text-primary flex justify-between mb-6 items-center">
                            <label>Indique uma nova data</label>
                            <input 
                                type="date" 
                                defaultValue={currentValue} 
                                onChange={(e) => handleSetDate(e.target.value)} 
                                min={currentValue}
                                className="border-solid border-[1px] border-primary rounded-[10px] w-2/5 p-1 text-primary cursor-text"
                            />
                        </div>

                        <div className="text-primary flex justify-between mb-6 items-center">
                            <label>Indique uma nova data</label>
                            <select 
                                onChange={(e) => handleChangeHour(e.target.value)}
                                className="border-solid border-[1px] border-primary rounded-[10px] w-2/5 p-1 text-primary cursor-pointer">
                                {
                                    filteredDate.map((hour, index) => {
                                        return(
                                            <option value={hour} key={index}>
                                                {hour}:00
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-between pt-0 px-8 pb-8">
                        <button 
                            onClick={handleChangeModal} 
                            className="cursor-pointer no-underline font-light rounded-2xl py-1 px-6 w-1/3 border-solid border-[1px] border-secondary bg-none text-secondary hover:bg-gray-50">
                                Cancelar
                        </button>
                        <button 
                            onClick={updateData}
                            className="cursor-pointer no-underline font-light rounded-2xl py-1 px-6 w-1/3 border-solid border-[1px] border-secondary bg-secondary text-white hover:bg-secondary-50">
                                Editar
                        </button>
                    </div>
                </div>
            </div>
        )
    }else{
        return <></>
    }
}