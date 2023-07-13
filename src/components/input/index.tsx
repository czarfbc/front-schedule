import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";

interface IInput {
  placeholder: string;
  type: "password" | "email" | "date" | "text";
  error?: string;
  icon: ReactNode;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  { placeholder, type, error, icon, ...rest },
  ref
) => {
  return (
    <div className="flex flex-wrap w-full items-center mb-6">
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
          type={type}
          {...rest}
          className="w-full 2xs:py-1 xs:py-2 2xs:px-7 md:py-[0.7rem] md:px-[2.2rem] rounded-lg border-[1px] border-gray-50 border-solid bg-white sm:text-sm md:text-base"
        />
      </label>
      {error && <span className="text-[#ff0000] font-bold">{error}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
