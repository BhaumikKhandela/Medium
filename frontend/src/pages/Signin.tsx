import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Quote } from "../components/Quote"
import { useState } from "react"

import { SigninSchemaType } from "../zod"
import axios from "axios"
import { BACKEND_URL } from "../components/config"

export const Signin = ()=> {
    const [credentials,setCredentials] = useState<SigninSchemaType>({
        email:"",
        password:""
    });

    const navigate = useNavigate()
    const sendRequest = async() => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,credentials);
            const jwt = response.data;
            localStorage.setItems("token",jwt);
            navigate("/blog");
        }catch(e){
            alert(e);
        }
    }
    return <div className="h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
<div className="bg-white flex justify-center items-center flex-col">
    <div className="w-1/2">
    <div className="text-center font-bold text-2xl">
   
   Log In
   
  </div>
   
<div className="my-6">
<Input inputfieldName="Email" placeholder="Enter the email" onChange={(e)=>{
setCredentials({
    ...credentials,
    email: e.target.value
})
}}/>
<Input inputfieldName="Password" placeholder="Enter the password" onChange={(e) => {
    setCredentials({
        ...credentials,
        password: e.target.value
    })
}}/>
</div>
<Button onClick={sendRequest} element="Sign In"/>
<div className="text-gray-500 mt-2 text-center">
    Don't have an account? <Link to={"/signup"} className="underline">Signin</Link>
</div>
 

</div>
    </div>
   <div className="hidden lg:block">
   <Quote/>
   </div>


    </div>
}