import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsPersonBadge } from "react-icons/bs";
// import { api } from '../../server'
// import { toast } from 'react-toastify'
import { UseAuth } from "../../hooks/auth";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}
export function Register() {
  const { createUser } = UseAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Campo de nome obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo de senha obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });
  const submit = handleSubmit(async ({ name, email, password }) => {
    try {
      createUser({ name, email, password });
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:33 ~ submit ~ error:", error);
    }
  });
  return (
    <div className="h-screen bg-[#0093E9] bg-gradient-to-br from-[#0093E9] to-[#80D0C7]">
      <div className="w-full px-4 mx-auto max-w-[1340px]">
        <p className="text-white pt-8">
          <Link to={"/"}>Home</Link> {">"} Área de Cadastro
        </p>
        <div className="w-full flex flex-col justify-evenly h-[92vh] items-center xl:flex-row">
          <div className="flex 2xs:w-2/3 sm:w-1/3 xl:w-1/2 justify-center">
            <img src={logo} alt="" />
          </div>
          <div className="2xs:w-full xs:w-2/3 sm:w-1/2 bg-gray-100 shadow-[0px_4px_8px_4px_rgba(0,0,0,0.2)] 2xs:rounded-xl sm:rounded-3xl 2xs:px-2 sm:px-4 2xs:py-4 sm:py-8 md:p-12 text-center">
            <h2 className="text-white not-italic 2xs:text-xl lg:text-3xl font-light mb-8">
              Área de Cadastro
            </h2>
            <form onSubmit={submit}>
              <Input
                placeholder="Nome"
                type="text"
                {...register("name", { required: true })}
                error={errors.name && errors.name.message}
                icon={<BsPersonBadge size={18} />}
              />
              <Input
                placeholder="Email"
                type="email"
                {...register("email", { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={18} />}
              />
              <Input
                placeholder="Senha"
                type="password"
                {...register("password", { required: true })}
                error={errors.password && errors.password.message}
                icon={<RiLockPasswordLine size={18} />}
              />
              <Button text="Cadastrar" />
            </form>
            <div className="text-left mt-4">
              <span className="text-white font-light 2xs:text-[0.65rem] md:text-sm">
                Já tem cadastro{" "}
                <Link to={"/"} className="text-white underline">
                  Voltar à página inicial
                </Link>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
