interface Avtarcomponents{
    name: string
    date: string
}
export const Avatar = ({name,date}: Avtarcomponents) => {
    const firstName = name.split(' ')[0].split('')[0];
    const lastName = name.split(' ')[1].split('')[0];
    
    
    return (
        <div className="flex flex-row items-center">
<div className="bg-slate-400 rounded-full font-bold p-1 ">
{firstName+lastName}
</div>
<div className="pl-2 pr-2">
{name}
</div>
<div className="bg-slate-500 rounded-full h-1 w-1">

</div>
<div className=" text-slate-500 pl-2">
    {date}
</div>
<div className=" text-yellow-500 pl-2">
✦
</div>

    </div>
    )
}