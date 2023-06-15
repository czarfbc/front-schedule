interface IButton {
    text: string;
}

export const  Button = ({text}: IButton) => {
    return(
        <button type="submit" className="w-full border-none p-[0.9rem] rounded-lg text-white bg-secondary">
            <span className="text-base">{text}</span>
        </button>
    )
}