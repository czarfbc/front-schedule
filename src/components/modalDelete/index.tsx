import { toast } from "react-toastify";
import { api } from "../../server";
import { isAxiosError } from "axios";
import { AiOutlineClose } from "react-icons/ai";

interface IModalDelete {
  handleChangeModalDelete: () => void;
  id: string;
  isOpen: boolean;
  name: string;
  hour: string;
  minutes: string;
}
export function ModalDelete({
  handleChangeModalDelete,
  id,
  isOpen,
  hour,
  minutes,
  name,
}: IModalDelete) {
  const handleDelete = async () => {
    try {
      await api.delete(`/schedules/${id}`);
      toast.success("Deletado com sucesso");
      handleChangeModalDelete();
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
              Excluir Horário
            </h2>
            <AiOutlineClose
              size={25}
              className="cursor-pointer"
              onClick={handleChangeModalDelete}
            />
          </div>
          <div className="py-4 2xs:px-2 xs:px-8">
            <p className="text-secondary 2xs:text-xl xs:text-2xl mb-3">
              {hour}:{minutes}h {name}
            </p>
            <div className="text-primary flex 2xs:flex-col xs:flex-row justify-between mb-6 items-center">
              <label>Tem certeza que deseja excluir este horário?</label>
            </div>
          </div>
          <div className="flex justify-between pt-0 2xs:px-2 xs:px-8 pb-8">
            <button
              onClick={handleChangeModalDelete}
              className="cursor-pointer no-underline font-light 2xs:rounded-xl xs:rounded-2xl py-1 2xs:px-3 xs:px-6 2xs:w-2/5 xs:w-1/3 border-solid border-[1px] border-secondary bg-none text-secondary hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="cursor-pointer no-underline font-light 2xs:rounded-xl xs:rounded-2xl py-1 2xs:px-3 xs:px-6 2xs:w-2/5 xs:w-1/3 border-solid border-[1px] border-secondary bg-secondary text-white hover:bg-secondary-50"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
