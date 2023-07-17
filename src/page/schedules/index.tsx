import { useForm } from "react-hook-form";
import { Header } from "../../components/header";
import { InputSchedule } from "../../components/inputSchedule";
import { UseAuth } from "../../hooks/auth";
import { useState } from "react";
import { formatISO, parseISO, setHours, setMinutes } from "date-fns";
import { api } from "../../server";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormValues {
  date: string;
  name: string;
  phone: string;
  hour: string;
  description?: string;
}
export function Schedules() {
  const schema = yup.object().shape({
    date: yup.string().required("Campo de data obrigatório"),
    name: yup.string().required("Campo de nome obrigatório"),
    phone: yup.string().required("Campo de telefone obrigatório"),
    hour: yup.string().required("Campo de hora obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const { handleSetDate } = UseAuth();

  const [hourSchedule, setHourSchedule] = useState("");
  const [minuteSchedule, setMinuteSchedule] = useState("");

  const defaultValueInputDate = "";

  const handleChangeHour = (hour: string, minutes: string) => {
    setHourSchedule(hour);
    setMinuteSchedule(minutes);
  };

  const submit = handleSubmit(async ({ name, phone, date, description }) => {
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
      await api.post(`/schedules/`, {
        name,
        phone,
        date: formattedDate,
        description,
      });
      toast.success("Agendado com sucesso");
      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });
  return (
    <div className="max-w-[1340px] mx-auto xs:px-4 w-full">
      <Header />
      <h2 className="text-2xl font-light text-primary 2xs:mx-0 2xs:my-4 xs:m-4">
        Agendamento de Horário
      </h2>
      <div className="sm:w-3/4 lg:w-1/2 m-auto">
        <form onSubmit={submit}>
          <InputSchedule
            type="text"
            label="Nome do cliente"
            {...register("name", { required: true })}
            error={errors.name && errors.name.message}
          />
          <InputSchedule
            type="number"
            label="Celular do Cliente"
            {...register("phone", { required: true })}
            error={errors.phone && errors.phone.message}
          />
          <InputSchedule
            type="text"
            label="Descrição (opcional)"
            {...register("description")}
            error={errors.description && errors.description.message}
          />
          <div className="flex 2xs:flex-col xs:flex-row justify-between">
            <InputSchedule
              type="date"
              label="Dia"
              {...register("date", {
                required: true,
                value: defaultValueInputDate,
                onChange: (e) => handleSetDate(e.target.value),
              })}
              error={errors.date && errors.date.message}
            />
            <div className="flex flex-col mb-2 xs:w-[26.2%]">
              <label className="w-full items-center text-primary">Hora</label>
              <input
                type="time"
                {...register("hour", {
                  required: true,
                  onChange: (e) => {
                    const [hour, minutes] = e.target.value.split(":");
                    handleChangeHour(hour, minutes);
                  },
                })}
                className="w-full p-2 2xs:rounded-lg xs:rounded-2xl border-[1px] border-primary border-solid bg-white bg-opacity-0 text-base"
              />
              {errors.hour && (
                <span className="text-[#ff0000] font-bold">
                  {errors.hour.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button className="cursor-pointer no-underline font-light 2xs:rounded-xl xs:rounded-2xl py-1 2xs:px-3 xs:px-6 2xs:w-2/5 xs:w-1/3 border-solid border-[1px] border-secondary bg-none text-secondary hover:bg-gray-50">
              <Link to={"/dashboard"}>Cancelar</Link>
            </button>
            <button className="cursor-pointer no-underline font-light 2xs:rounded-xl xs:rounded-2xl py-2 2xs:px-3 xs:px-6 2xs:w-2/5 xs:w-1/3 border-solid border-[1px] border-secondary bg-secondary text-white hover:bg-secondary-50">
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
