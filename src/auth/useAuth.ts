import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom"; 
import { signupSchema, loginSchema, type SignupFormData, type LoginFormData } from "./schema";
import { useProvider } from "./AuthProvider"; 
import {users} from "../data/users"
export const useSignup = () => {
  const { login } = useProvider();
  const navigate = useNavigate(); 

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur"
  });

  const handleSignup: SubmitHandler<SignupFormData> = async (data) => {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });
    const existingUser = users.find(u => u.email === data.email);
    
    if (existingUser) {
        form.setError("email", { 
            type: "manual", 
            message: "User already exists in dummy database" 
        });
        return; 
    }
    const fakeToken = "new-user-token-abc";

    const userData = { 
        username: data.username, 
        email: data.email 
    };

    console.log("Creating new user:", userData);
    
    login(fakeToken, userData);
    navigate("/dashboard"); 
  };

  return { form, handleSignup };
};

export const useLogin = () => {
  const { login } = useProvider();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = users.find(u => u.email === data.email);

    if (foundUser) {
        const userData = { 
            username: foundUser.username,
            email: foundUser.email 
        };
        
        console.log("Found User:", userData);
        login("mock-token-123", userData);
        navigate("/dashboard");
    } else {
        console.warn("User not in dummy DB, logging in as Guest...");
        
        const guestData = {
             username: "Guest User", 
             email: data.email 
        };
        login("guest-token", guestData);
        navigate("/dashboard");
    }
  };

  return { form, handleLogin };
};