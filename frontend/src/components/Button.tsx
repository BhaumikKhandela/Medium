
type element = {
    element: string
    onClick: ()=>void;
}


export const Button = ({element,onClick}:element) => {
    return (
        <div className="bg-black rounded-md text-center">
            <button onClick={onClick}className="text-white  p-2 rounded-md w-full">{element}</button>
        </div>
    )
}