import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-32 min-h-screen min-w-full bg-primary">
      <h1 className="text-5xl font-bold text-white">Página não existe!</h1>

      <Link to={"/"}>
        <button className="py-3 px-4 font-semibold p-1 border-solid border-black border-2 bg-gray-50 hover:bg-opacity-80 active:shadow-[inset_-4px_4px_#222] active:text-sm shadow-[-2px_3px_0_#222,_-4px_6px_#000] rounded-md">
          Página Incial
        </button>
      </Link>
    </div>
  );
}
