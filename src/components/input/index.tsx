import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { BiHide } from "react-icons/bi";

interface IInput {
  placeholder: string;
  type: "password" | "email" | "date" | "text";
  error?: string;
  icon: ReactNode;
  showIcon?: ReactNode;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  { placeholder, type, error, icon, showIcon, ...rest },
  ref
) => {
  const [showPasswordToggleIcon, setShowPasswordToggleIcon] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPasswordToggleIcon(!showPasswordToggleIcon);
  };

  return (
    <div className="flex relative flex-wrap w-full items-center mb-6">
      <label className="relative w-full flex items-center">
        <i
          aria-hidden="true"
          className="absolute pl-2 left-0 flex items-center"
        >
          {icon}
        </i>
        <input
          name=""
          id=""
          placeholder={placeholder}
          ref={ref}
          type={showPasswordToggleIcon ? "text" : type}
          {...rest}
          className="w-full 2xs:py-1 xs:py-2 2xs:px-7 md:py-[0.7rem] md:px-[2.2rem] rounded-lg border-[1px] border-gray-50 border-solid bg-white sm:text-sm md:text-base"
        />
      </label>
      <i
        aria-hidden="true"
        className="absolute pr-2 right-0 flex items-center cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPasswordToggleIcon ? <BiHide size={18} /> : showIcon}
      </i>
      {error && <span className="text-[#ff0000] font-bold">{error}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
