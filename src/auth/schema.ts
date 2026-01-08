import {z} from "zod";

export const signupSchema = z.object({
    username : z.string().min(4,"Must be atleast 4 characters"),
    email : z.string().email("Invalid email Address"),
    password : z.string().min(8,"Must be 8 character or more"),
    confirmPassword : z.string()
}).refine((data)=>data.password==data.confirmPassword,{
    message : "Passwords do not match",
    path:["confirmPassword"]
})

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email : z.string().email("Enter valid email address"),
    password : z.string().min(1,"Password is required")
})

export type LoginFormData = z.infer<typeof loginSchema>;