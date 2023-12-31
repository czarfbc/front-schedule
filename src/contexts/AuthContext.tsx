import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAuthProvider {
  children: ReactNode;
}
interface IAuthContextData {
  signIn: ({ email, password }: ISignIn) => void;
  signOut: () => void;
  createUser: ({ name, email, password }: ICreateUser) => void;
  user: IUserData;
  schedules: Array<ISchedules>;
  date: string;
  handleSetDate: (date: string) => void;
  isAutheticated: boolean;
  handleSetPhone: (phone: string) => void;
  phone: string;
  description: string;
  handleSetDescription: (description: string) => void;
}
interface ISchedules {
  id: string;
  name: string;
  phone: string;
  date: Date;
  description: string;
}
interface ISignIn {
  email: string;
  password: string;
}
interface IUserData {
  name: string;
  avatar_url: string;
  email: string;
}
interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
  const [schedules, setSchedules] = useState<Array<ISchedules>>([]);
  const [date, setDate] = useState("");

  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });
  const isAutheticated = !!user && Object.keys(user).length !== 0;

  const navigate = useNavigate();
  const handleSetDate = (date: string) => {
    setDate(date);
  };
  const handleSetPhone = (phone: string) => {
    setPhone(phone);
  };
  const handleSetDescription = (description: string) => {
    setDescription(description);
  };

  useEffect(() => {
    api
      .get("/schedules", {
        params: {
          date,
          phone,
          description,
        },
      })
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => console.log(error));
  }, [date, phone, description]);

  async function createUser({ name, email, password }: ICreateUser) {
    try {
      const { data } = await api.post("/users", {
        name,
        email,
        password,
      });

      navigate("/login");
      toast.success("Conta criada com sucesso");

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Não foi possível criar a conta. Tente mais tarde");
      }
    }
  }

  async function signIn({ email, password }: ISignIn) {
    try {
      const { data } = await api.post("/users/auth", {
        email,
        password,
      });
      const { token, refresh_token, user } = data;
      const userData = {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      };
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
      toast.success(`Seja bem vindo(a), ${userData.name}`);
      setUser(userData);

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Não foi possível fazer o login. Tente mais tarde");
      }
    }
  }
  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        schedules,
        date,
        handleSetDate,
        createUser,
        isAutheticated,
        handleSetPhone,
        phone,
        description,
        handleSetDescription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
