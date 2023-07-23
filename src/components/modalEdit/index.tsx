import { AiOutlineClose } from "react-icons/ai";
import { UseAuth } from "../../hooks/auth";
import { formatISO, parseISO, setHours, setMinutes } from "date-fns";
import { useState } from "react";
import { api } from "../../server";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

interface IModal {
  isOpen: boolean;
  handleChangeModal: () => void;
  name: string;
  hour: string;
  id: string;
  minutes: string;
}
export function ModalEdit({
  isOpen,
  handleChangeModal,
  hour,
  name,
  id,
  minutes,
}: IModal) {
  const { date, handleSetDate } = UseAuth();
  const [hourSchedule, setHourSchedule] = useState("");
  const [minuteSchedule, setMinuteSchedule] = useState("");

  const currentValue = new Date().toISOString().split("T")[0];
  const defaultValueInputDate = "";

  const handleChangeHour = (hour: string, minutes: string) => {
    setHourSchedule(hour);
    setMinuteSchedule(minutes);
  };

  const updateData = async () => {
    const formattedHoursDate = formatISO(
      setHours(parseISO(date), parseInt(hourSchedule))
    );
    const formattedMinutesDate = formatISO(
      setMinutes(parseISO(date), parseInt(minuteSchedule))
    );

    const datePart1 = formattedHoursDate.slice(0, 13);
    const timePart2 = formattedMinutesDate.slice(13, 25);

    const concatenatedDate = `${datePart1}${timePart2}`;
    const formattedDate = concatenatedDate;

    try {
      await api.put(`/schedules/${id}`, {
        date: formattedDate,
      });
      toast.success("Atualizado com sucesso");
      handleChangeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-10">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 2xs:w-full xs:w-[450px] bg-white 2xs:rounded-lg xs:rounded-2xl">
          <div className="bg-primary 2xs:rounded-t-lg xs:rounded-t-2xl text-white flex justify-between 2xs:p-4 xs:p-8">
            <h2 className="2xs:text-lg xs:text-2xl font-bold">
              Editar Horário
            </h2>
            <AiOutlineClose
              size={25}
              className="cursor-pointer"
              onClick={handleChangeModal}
            />
          </div>
          <div className="py-4 2xs:px-2 xs:px-8">
            <p className="text-secondary 2xs:text-xl xs:text-2xl mb-3">
              {hour}:{minutes}h {name}
            </p>

            {/* <div className="text-primary flex 2xs:flex-col xs:flex-row justify-between mb-6 items-center">
              <label>Indique uma nova descrição</label>
              <input
                type="text"
                defaultValue={defaultValueInputDate}
                onChange={(e) => handleSetDate(e.target.value)}
                min={currentValue}
                className="border-solid border-[1px] border-primary rounded-[10px] 2xs:w-3/5 xs:w-2/5 p-1 text-primary cursor-text"
              />
            </div>
            <div className="text-primary flex 2xs:flex-col xs:flex-row justify-between mb-6 items-center">
              <label>Indique um novo número</label>
              <input
                type="number"
                defaultValue={defaultValueInputDate}
                onChange={(e) => handleSetDate(e.target.value)}
                min={currentValue}
                className="border-solid border-[1px] border-primary rounded-[10px] 2xs:w-3/5 xs:w-2/5 p-1 text-primary cursor-text"
              />
            </div> */}

            <div className="text-primary flex 2xs:flex-col xs:flex-row justify-between mb-6 items-center">
              <label>Indique uma nova data</label>
              <input
                type="date"
                defaultValue={defaultValueInputDate}
                onChange={(e) => handleSetDate(e.target.value)}
                min={currentValue}
                className="border-solid border-[1px] border-primary rounded-[10px] 2xs:w-3/5 xs:w-2/5 p-1 text-primary cursor-text"
              />
            </div>

            <div className="text-primary flex 2xs:flex-col xs:flex-row justify-between mb-6 items-center">
              <label>Indique uma nova hora</label>
              <input
                type="time"
                onChange={(e) => {
                  const [hour, minutes] = e.target.value.split(":");
                  handleChangeHour(hour, minutes);
                }}
                className="border-solid border-[1px] border-primary rounded-[10px] 2xs:w-3/5 xs:w-2/5 p-1 text-primary cursor-text"
              />
            </div>
          </div>
          <div className="flex justify-between pt-0 2xs:px-2 xs:px-8 pb-8">
            <button
              onClick={handleChangeModal}
              className="cursor-pointer no-underline font-light 2xs:rounded-xl xs:rounded-2xl py-1 2xs:px-3 xs:px-6 2xs:w-2/5 xs:w-1/3 border-solid border-[1px] border-secondary bg-none text-secondary hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={updateData}
              className="cursor-pointer no-underline font-light 2xs:rounded-xl xs:rounded-2xl py-1 2xs:px-3 xs:px-6 2xs:w-2/5 xs:w-1/3 border-solid border-[1px] border-secondary bg-secondary text-white hover:bg-secondary-50"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
