import { useForm } from "react-hook-form";
import logo from "../../assets/logo.svg";
import { Input } from "../../components/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/button";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { UseAuth } from "../../hooks/auth";

interface IFormValues {
  email: string;
  password: string;
}
export function Login() {
  const { signIn } = UseAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup.string().required("Campo de senha obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });
  const submit = handleSubmit(async ({ email, password }) => {
    try {
      signIn({ email, password });
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:29 ~ submit ~ error:", error);
    }
  });
  return (
    <div className="h-screen bg-[#0093E9] bg-gradient-to-br from-[#0093E9] to-[#80D0C7]">
      <div className="w-full px-4 mx-auto max-w-[1340px] justify-end flex">
        <div className="w-full flex flex-col justify-evenly items-center h-screen xl:flex-row">
          <div className="flex 2xs:w-2/3 sm:w-1/3 xl:w-1/2 justify-center">
            <img src={logo} alt="" />
          </div>
          <div className="2xs:w-full xs:w-2/3 sm:w-1/2 bg-gray-100 shadow-[0px_4px_8px_4px_rgba(0,0,0,0.2)] 2xs:rounded-xl sm:rounded-3xl 2xs:px-2 sm:px-4 2xs:py-4 sm:py-8 md:p-12 text-center">
            <h2 className="text-white not-italic 2xs:text-xl lg:text-3xl font-light mb-8">
              Olá, seja bem vindo
            </h2>
            <form onSubmit={submit}>
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
              <Button text="Entrar" />
            </form>
            <div className="text-left mt-4">
              <span className="text-white font-light 2xs:text-[0.65rem] md:text-sm">
                Ainda não tem conta?{" "}
                <Link to={"/register"} className="text-white underline">
                  Cadastre-se
                </Link>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
