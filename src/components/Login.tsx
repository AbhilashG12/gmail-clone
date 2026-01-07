import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/mail");
    }
  }, [user, navigate]);

  return (
    <div className="p-5 w-200 h-100 bg-neutral-100 rounded-2xl ml-80 mt-40 shadow-2xl">
      <div className="ml-50 mt-5">
        <h1 className="text-2xl font-serif font-semibold italic">
          Welcome to Gmail-client
        </h1>
      </div>

      <div className="mt-5">
        <p className="font-semibold">
          Built a Gmail-inspired email client using React and TypeScript,
          focusing on scalable frontend architecture and performance.
          Implemented Google OAuth authentication without a backend, protected
          routes, and a mock inbox with deterministic per-user ordering.
        </p>
      </div>

      <div className="mt-10 ml-30">
        <h1 className="font-semibold">
          You can login directly using your Gmail Account with Google
        </h1>

        <button
          onClick={login}
          className="mt-5 ml-[25%] border p-3 rounded-2xl bg-red-400 cursor-pointer text-white hover:bg-red-500 shadow-2xl"
        >
          Sign-in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
