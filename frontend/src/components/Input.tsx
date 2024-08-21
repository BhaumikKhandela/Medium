import { ChangeEvent } from "react"

type inputfiled = {
    inputfieldName: string
    placeholder: string
    onChange: (e:ChangeEvent<HTMLInputElement>)=> void
    
}

export const Input = ({inputfieldName,placeholder,onChange}: inputfiled) => {
    return (
        <div className="font-bold  ">
    {inputfieldName}
    <div className="my-3 ">
    <input className="w-full h-10 px-2   border-t-1 border-2 border-gray-200 rounded-md" placeholder={placeholder} onChange={onChange}/>
    
    </div>
        </div>
    )
}