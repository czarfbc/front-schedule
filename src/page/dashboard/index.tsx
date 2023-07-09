import { Card } from "../../components/card";
import style from './dashboard.module.css';
import { Header } from "../../components/header";
import { UseAuth } from "../../hooks/auth";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { api } from "../../server";


interface ISchedules {
    id: string;
    name: string;
	phone: string;
	date: Date;
}
export function Dashboard() {
    const [date, setDate] = useState(new Date())
    const [schedules, setSchedules] = useState<Array<ISchedules>>([])
    const {user} = UseAuth()

    const limitBackDate = new Date();
    limitBackDate.setMonth(limitBackDate.getMonth() - 3);

    const isWeekDay = (date: Date) => { 
        const day = date.getDay()
        return day === day
    }

    const handleDataChange = (date: Date) => {
        setDate(date)
    }

    useEffect(() => {
        api.get('/schedules', {
            params: {
                date,
            }
        }).then((response) => {
            setSchedules(response.data)
        }).catch((error) => console.log(error))
    },[date])

    return(
        <div className="max-w-[1340px] mx-auto w-full">
            <Header/>
            <div className="mt-6 mb-8 m-4 font-normal text-primary">
                <h2 className="md:text-xl lg:text-2xl">Bem vindo(a), <span className="font-bold">{user.name}</span></h2>
                <p>Esta é sua lista de horários {isToday(date) && <span>de hoje,</span>} dia {format(date, 'dd/MM/yyyy')}</p>
            </div>
            <h2 className="text-secondary mx-4 mb-5 md:text-xl lg:text-2xl font-bold">Próximos Horários</h2>
            <div className="flex md:justify-evenly md:flex-col md:items-center lg:items-start lg:justify-between lg:flex-row">
                <div className={`md:w-full md:flex md:flex-col md:items-center lg:hidden lg:w-1/2 max-h-[60vh] overflow-y-auto scroll-smooth ${style.cardWrapper}`}>
                    {schedules.map((schedules, index) => {
                        return(
                            <Card key={index} id={schedules.id} date={schedules.date} name={schedules.name} phone={schedules.phone} />
                        )
                    })}
                </div>
                <div className="flex md:w-1/3 lg:w-1/2 justify-center">
                    <DayPicker className="bg-primary h-fit md:p-2 lg:p-4 rounded-[10px] text-white shadow-[0_4px_8px_4px_rgba(0,0,0,0.3)]" 
                        selected={date} 
                        mode="single" 
                        //disabled={isWeekend} 
                        modifiers={{available: isWeekDay}}
                        onDayClick={handleDataChange}
                        locale={ptBR}
                        fromDate={limitBackDate}
                        classNames={{
                            day: `${style.day} bg-white w-10 h-10 text-black m-[0.15rem] rounded-md`,
                            nav_button_previous: style.nav_button_previous,
                            nav_button_next: style.nav_button_next,
                        }}
                        modifiersClassNames={{
                            selected: style.selected,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}