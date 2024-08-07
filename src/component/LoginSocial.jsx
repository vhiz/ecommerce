import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { WixClientContext } from "../context/WixContext";

export default function LoginSocial() {
  const { wixClient, loading } = useContext(WixClientContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;
    setIsLoading(true);
    const loginRequestData = wixClient.auth.generateOAuthData(
      import.meta.env.VITE_BASE_URL
    );
    localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
    window.location.href = authUrl;

    setIsLoading(false);
  }
  return (
    <div className="flex h-[20%] w-full items-center justify-center gap-x-3">
      <div className="tooltip" data-tip="login from google">
        <button
          disabled={isLoading}
          className="btn btn-circle"
          onClick={handleLogin}
        >
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <FcGoogle className="text-lg" />
          )}
        </button>
      </div>
    </div>
  );
}
