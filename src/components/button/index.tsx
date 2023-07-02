interface IButton {
    text: string;
}

export const  Button = ({text}: IButton) => {
    return(
        <button type="submit" className="w-full border-none p-[0.9rem] rounded-lg text-white bg-secondary hover:bg-secondary-50 shadow-[3px_4px_6px_0px_rgba(0,0,0,1)] active:scale-[0.97]">
            <span className="text-base">{text}</span>
        </button>
    )
}