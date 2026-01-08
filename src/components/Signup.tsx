import { useSignup } from "../auth/useAuth";
import { SignupView } from "./SignupView";

export const Signup = () => {
  const { form, handleSignup } = useSignup();
  return <SignupView form={form} onSubmit={handleSignup} />;
};