import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { isAfter } from "date-fns";
import style from "./card.module.css";
import { useState } from "react";
import { ModalEdit } from "../../modalEdit";
import { ModalDelete } from "../../modalDelete";

interface ISchedules {
  id: string;
  name: string;
  phone: string;
  date: Date;
  description: string;
}
export const CardAll = ({ id, name, date, phone, description }: ISchedules) => {
  const isAfterDate = isAfter(new Date(date), new Date());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const dateFormatted = new Date(date);
  const gmtFormatted = dateFormatted.toLocaleString("pt-BR", {
    timeZone: "UTC",
  });
  const partesHoraFormatada = gmtFormatted.split(" ")[1];
  const [hour, minutes] = partesHoraFormatada.split(":");

  let phoneFormatted = phone.replace(/\D/g, "");
  phoneFormatted = phoneFormatted.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3"
  );

  const handleChangeModal = () => {
    setOpenModal(!openModal);
  };
  const handleChangeModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  return (
    <>
      <div className="bg-gray-50 flex flex-col 2xs:mx-0 sm:w-auto md:w-full lg:w-auto rounded-lg justify-between items-center 2xs:mb-3 xs:mb-5 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.3)]">
        <div className="flex bg-white w-full justify-between items-center rounded-lg">
          <div className="flex gap-2 items-center">
            <span
              className={`${
                !isAfterDate && style.oldHour
              }  2xs:text-xs xs:text-sm lg:text-xl bg-secondary text-white rounded-s-lg 2xs:py-[0.5rem] 2xs:px-[0.5rem] xs:p-[0.8rem] md:mr-4 lg:mr-8`}
            >
              {hour}:{minutes}h
            </span>
            <p className="text-primary 2xs:text-[0.65rem] xs:text-sm lg:text-xl">
              {name} - {phoneFormatted}
            </p>
          </div>
          <div className="flex mx-2 gap-2">
            <AiOutlineEdit
              size={15}
              color={`${!isAfterDate ? "#7c838b" : "#5F68B1"}`}
              onClick={() => isAfterDate && handleChangeModal()}
              className="cursor-pointer"
            />
            <RiDeleteBinLine
              size={15}
              color={`${!isAfterDate ? "#7c838b" : "#EB2E2E"}`}
              onClick={() => isAfterDate && handleChangeModalDelete()}
              className="cursor-pointer"
            />
          </div>
        </div>

        {description ? (
          <details className="w-full cursor-pointer">
            <summary className="text-secondary-50 flex justify-center 2xs:text-sm xs:text-base sm:text-lg">
              ▼Descrição
            </summary>
            <p className="text-primary flex justify-center 2xs:text-[0.65rem] xs:text-xs sm:text-sm xl:text-lg">
              {description}
            </p>
          </details>
        ) : (
          <></>
        )}
      </div>

      <ModalEdit
        isOpen={openModal}
        handleChangeModal={handleChangeModal}
        hour={String(hour)}
        minutes={String(minutes)}
        name={name}
        id={id}
      />
      <ModalDelete
        isOpen={openModalDelete}
        handleChangeModalDelete={handleChangeModalDelete}
        id={id}
        hour={String(hour)}
        minutes={String(minutes)}
        name={name}
      />
    </>
  );
};
