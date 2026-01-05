import { useAuth } from "../auth/useAuth"

export const Dashboard=()=>{
    const {user} = useAuth()
    return (
        <div>
          welcome {user?.email}            
        </div>
    )
}