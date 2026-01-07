export type GoogleUser = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

export function loadGoogleSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Identity SDK"));

    document.head.appendChild(script);
  });
}

let initialized = false;

export async function initGoogle(
  onSuccess: (user: GoogleUser) => void
) {
  if (initialized) return; // 🚨 prevent re-init
  initialized = true;

  await loadGoogleSDK();

  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (response) => {
      console.log("GOOGLE CREDENTIAL RECEIVED");

      const payload = JSON.parse(atob(response.credential.split(".")[1]));

      onSuccess({
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
    },
    use_fedcm_for_prompt: false,
  });
}

export function promptGoogleLogin() {
  window.google.accounts.id.prompt();
}

export function logoutGoogle() {
  localStorage.removeItem("gmail_clone_user");
}
