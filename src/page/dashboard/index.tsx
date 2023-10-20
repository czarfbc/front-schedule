import { Card } from "../../components/cards/cardDash";
import style from "./dashboard.module.css";
import { Header } from "../../components/header";
import { UseAuth } from "../../hooks/auth";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { api } from "../../server";
import { Watch } from "react-loader-spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";

interface ISchedules {
  id: string;
  name: string;
  phone: string;
  date: Date;
  description: string;
}
export function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Array<ISchedules>>([]);
  const { user } = UseAuth();
  const [removeLoading, setRemoveLoading] = useState(false);

  const [hideDayPicker, setHideDayPicker] = useState(true);
  const handleHideDayPicker = () => {
    setHideDayPicker(!hideDayPicker);
    console.log(hideDayPicker);
  };

  const limitBackDate = new Date();
  limitBackDate.setMonth(limitBackDate.getMonth() - 3);

  const isWeekDay = (date: Date) => {
    const day = date.getDay();
    return day === day;
  };

  const handleDataChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    setRemoveLoading(false);
    api
      .get("/schedules", {
        params: {
          date,
        },
      })
      .then((response) => {
        setSchedules(response.data);
        setRemoveLoading(true);
      })
      .catch((error) => console.log(error));
  }, [date]);

  const footer = date ? (
    <p>Você selecionou {format(date, "PPP", { locale: ptBR })}.</p>
  ) : (
    <p>Please pick a day.</p>
  );

  return (
    <div className="max-w-[1340px] mx-auto w-full">
      <Header />
      <div className="mt-6 xs:mb-8 2xs:m-2 xs:m-4 font-normal text-primary">
        <h2 className="md:text-xl lg:text-2xl">
          Bem vindo(a), <span className="font-bold">{user.name}</span>
        </h2>
        {isToday(date) ? (
          <p>
            Esta é sua lista de horários de hoje, dia{" "}
            {format(date, "dd/MM/yyyy")}
          </p>
        ) : (
          <p>
            Está é sua lista de horários do dia {format(date, "dd/MM/yyyy")}
          </p>
        )}
      </div>
      <h2 className="text-secondary xs:mx-4 2xs:m-2 xs:mb-5 md:text-xl lg:text-2xl font-bold">
        Próximos Horários
      </h2>
      <div className="flex md:justify-evenly 2xs:flex-col xs:flex-col sm:flex-col md:items-center lg:items-start lg:justify-between lg:flex-row">
        <div
          className={`flex flex-col sm:w-full md:px-4 lg:px-0 md:items-center lg:items-stretch lg:w-1/2 ${
            !hideDayPicker && style.hmax
          } 2xs:max-h-[11vh] xs:max-h-[20vh] lg:max-h-[60vh] overflow-x-hidden overflow-y-auto scroll-smooth ${
            style.cardWrapper
          }`}
        >
          {!removeLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Watch
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          )}
          {schedules.map((schedules, index) => {
            return (
              <Card
                key={index}
                id={schedules.id}
                date={schedules.date}
                name={schedules.name}
                phone={schedules.phone}
                description={schedules.description}
              />
            );
          })}
        </div>
        <div className="flex mt-4 md:w-1/3 lg:w-1/2 p-4 justify-center ">
          <div className="bg-primary py-2  rounded-[10px] w-[346px] flex flex-col items-center shadow-[0_4px_8px_4px_rgba(0,0,0,0.3)] ">
            {hideDayPicker ? (
              <>
                <AiOutlineCloseCircle
                  size={25}
                  className="cursor-pointer text-white"
                  onClick={handleHideDayPicker}
                />
                <DayPicker
                  className="bg-primary m-0 pb-2 2xs:px-2 xs:px-4 h-fit rounded-b-[10px] text-white "
                  selected={date}
                  mode="single"
                  footer={footer}
                  modifiers={{ available: isWeekDay }}
                  onDayClick={handleDataChange}
                  locale={ptBR}
                  fromDate={limitBackDate}
                  classNames={{
                    day: `${style.day} bg-white 2xs:w-[33px] 2xs:h-[33px] 1.5xs:w-10 1.5xs:h-10 text-black 2xs:m-[0.1rem] xs:m-[0.15rem] rounded-md`,
                    nav_button_previous: style.nav_button_previous,
                    nav_button_next: style.nav_button_next,
                  }}
                  modifiersClassNames={{
                    selected: style.selected,
                  }}
                />
              </>
            ) : (
              <BiCircle
                size={25}
                className="cursor-pointer text-white"
                onClick={handleHideDayPicker}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
