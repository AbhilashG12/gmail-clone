import { useAuth } from "../auth/useAuth"

export const Dashboard = () => {
  const { user } = useAuth();

  console.log("AUTH USER:", user);

  return <div>welcome {user?.email}</div>;
};
