export interface GoogleUser{
    id:number,
    email : string,
    name : string,
    avatar : string,
}

type GoogleCredentialResponse = {
  credential: string;
};

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

let initialized = false;

export function loadGoogleSDK():Promise<void>{
    if(initialized) return  Promise.resolve();

    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () =>{
            initialized = true;
            resolve();
        }

        document.body.appendChild(script)
    })
}

export async function initGoogleLogin(onSuccess:(user:GoogleUser)=>void) {
    await loadGoogleSDK();
    window.google.accounts.id.initialize({
        client_id : CLIENT_ID,
        callback : (response:GoogleCredentialResponse)=>{
            const user = decodeJwt(response.credential);
            onSuccess(user)
        }
    })
}

export function promptGoogleLogin() {
  window.google.accounts.id.prompt();
}

export function logoutGoogle() {
  localStorage.removeItem("gmail_clone_user");
}

function decodeJwt(token: string): GoogleUser {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    avatar: payload.avatar,
  };
}