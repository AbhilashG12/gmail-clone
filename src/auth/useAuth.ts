import {useForm,type SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {signupSchema,loginSchema,type SignupFormData,type LoginFormData} from "./schema"

export const useSignup=()=>{
    const form = useForm<SignupFormData>({
        resolver : zodResolver(signupSchema),
        mode : "onBlur"
    });
    const handleSignup:SubmitHandler<SignupFormData>=async(data)=>{
        await new Promise((resolve)=>{setTimeout(resolve,1000)})
        console.log("Signup completed",data)
    }

    return {form,handleSignup}

}

export const useLogin=()=>{
    const form = useForm<LoginFormData>({
        resolver : zodResolver(loginSchema),
    })
    const handleLogin:SubmitHandler<LoginFormData>=async(data)=>{
        await new Promise((resolve)=>setTimeout(resolve,1000))
        console.log("Login Successful",data)
    }

    return {form,handleLogin}
}
