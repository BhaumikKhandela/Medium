import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { Content } from "./Content"
interface Blogcontent {
    name: string
    title: string
    content: string
    id: string
}
export const BlogPage = ({name,title,content,id}: Blogcontent) => {
    return (
    <Link to={`/blog/${id}`}>
    <div className="border border-b-2 border-t-0 border-x-0 mx-32 my-2 cursor-pointer ">
        <div className="px-5">
        <Avatar name={name} date={"20 Dec 2023"}/>
        </div>
        <div className=" px-5">
        <Content title={title} description={content} blogTag={"Side Hustle"}/>
        
        </div>
        
        
         
            
        
    </div></Link>)
}