import { useProvider } from "../auth/AuthProvider"


const Dashboard = () => {
    const {logout} = useProvider()
  return (
    <div>
      <h1>Hey there Welcome to email client</h1>
      <button className="border p-3 rounded" onClick={()=>{logout()}}>Logout</button>
    </div>
  )
}

export default Dashboard
