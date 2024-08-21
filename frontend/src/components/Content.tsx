interface ContentType {
    title: string
    description: string
    blogTag: string
}
export const Content = ({title,description,blogTag}: ContentType) => {
  const  descriptionLength = description.slice(0,200) + "...";
  const lengthOfDescription = description.split(' ').length;
  let readingMinutes;
  if(lengthOfDescription>100){
 readingMinutes = Math.ceil(lengthOfDescription*0.01);
  }else{
    readingMinutes = 1;
  }
    return(
        <div className="flex flex-col mt-4 mb-2">
            <div className="font-extrabold text-xl">
                {title}
            </div>
            <div className="font-semibold">
                {descriptionLength}
            </div>
            <div className="mt-4 flex flex-row items-center">
<div className="bg-slate-100 rounded-2xl p-1 pr-2 pl-2">
    {blogTag}
</div>
<div className="text-slate-500 ml-2">
    {readingMinutes+ " min read"}
</div>
            </div>
        </div>
    )
}