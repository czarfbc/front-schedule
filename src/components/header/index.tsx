import { Link } from "react-router-dom";
import logo from "../../assets/logo_small.svg";
import { BsGearFill } from "react-icons/bs";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";
import { UseAuth } from "../../hooks/auth";

export function Header() {
  const { signOut } = UseAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="flex w-auto justify-between items-center bg-primary text-white py-4 2xs:mx-0 xs:mx-4 px-6 2xs:mt-0 xs:mt-6 xs:rounded-lg shadow-[0_4px_8px_4px_rgba(0,0,0,0.3)]">
      <div>
        <Link to={"/dashboard"} className="flex items-center">
          <img src={logo} alt="" className="-ml-2" />
        </Link>
      </div>
      <div className="flex items-center cursor-pointer">
        <div
          onClick={() => setOpen(!open)}
          className="relative flex items-center"
        >
          {open ? <CgCloseO size={23} /> : <BsGearFill size={23} />}
          {open && (
            <ul className="absolute top-[100%] right-[-1.5rem] p-0 list-none rounded-lg opacity-1 transition-all bg-primary drop-shadow-[0px_9px_4px_rgba(0,0,0,0.25)]">
              <Link to={"/getall"}>
                <li className="py-3 px-4 hover:bg-[#64a2a4]">Total_Agendas</li>
              </Link>
              <Link to={"/dashboard"}>
                <li className="py-3 px-4 hover:bg-[#64a2a4]">Agenda_Dia</li>
              </Link>
              <Link to={"/schedules"}>
                <li className="py-3 px-4 hover:bg-[#64a2a4]">Agendar</li>
              </Link>
              <li
                onClick={signOut}
                className="py-3 px-4 hover:bg-[#64a2a4] rounded-b-lg"
              >
                Sair
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
