import { useLogin } from "../auth/useAuth";
import { LoginView } from "./LoginView";
import { useProvider } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useProvider();
  const navigate = useNavigate();
  const { form, handleLogin } = useLogin();

  const onSubmit = async (data: { email: string; password: string }) => {
    await handleLogin(data);
    

    login("myjwttoken", { 
      email: data.email, 
      username: "Demo User" 
    });
    
    navigate("/dashboard");
  };

  return <LoginView form={form} onSubmit={onSubmit} />;
};