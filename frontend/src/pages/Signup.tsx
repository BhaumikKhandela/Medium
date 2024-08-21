import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Quote } from "../components/Quote"
import { SignupSchemaType} from "../zod"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../components/config"

export const Signup = () => {
    const [credentials,setCredentials] = useState<SignupSchemaType>({
    email:"",
    name:"",
    password:""
    })
    const navigate = useNavigate();
    const sendRequest = async() => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,credentials);
            const jwt = response.data.jwt;
            
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }catch(e){
            alert(e);
            console.log(e);

        }
    }
    return <>
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="bg-white-900 flex justify-center items-center">
            <div className="w-1/2">
            <div className="text-center">
            <span className="text-3xl font-extrabold ">
                Create an account
            </span>
            <div className="text-gray-500 mx-6">
                Already have an account? <Link className="underline" to={"/signin"}>Login</Link>
                </div>
            </div>
            
                <div className="my-10">
                <Input inputfieldName="Email" placeholder="example@example.com" onChange={(e) => {
                   setCredentials({
                    ...credentials,
                    email: e.target.value
                   });
                }}/>
                <Input inputfieldName="Username" placeholder="John Doe" onChange={(e) => {
                    setCredentials({
                        ...credentials,
                        name: e.target.value
                    });
                }}/>
                <Input inputfieldName="Password" placeholder="123456" onChange={(e) => {
                    setCredentials({
                        ...credentials,
                        password: e.target.value
                    });
                }}/>
                </div>
                <div>
                    <Button onClick={sendRequest}element="Sign Up"/>
                </div>
                
            </div>

        </div>
        <div className="hidden lg:block">
        <Quote/>
        </div>
   
    </div>
     
    </>
}

