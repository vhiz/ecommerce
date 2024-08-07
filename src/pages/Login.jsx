import { useContext, useEffect, useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginSocial from "../component/LoginSocial";
import Seo from "../layout/Seo";
import { WixClientContext } from "../context/WixContext";
import { LoginState } from "@wix/sdk";
import OTPInput from "react-otp-input";
import Counter from "../component/Counter";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { wixClient, loading } = useContext(WixClientContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = wixClient?.auth?.loggedIn();
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, wixClient]);
  const [mode, setMode] = useState("LOGIN");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [see, setSee] = useState(false);
  const [reset, setReset] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  const formTitle =
    mode === "LOGIN"
      ? "Log in"
      : mode === "REGISTER"
      ? "Register"
      : mode === "RESET_PASSWORD"
      ? "Reset Your Password"
      : "Enter verification code from email";

  const buttonTitle =
    mode === "LOGIN"
      ? "Login"
      : mode === "REGISTER"
      ? "Register"
      : mode === "RESET_PASSWORD"
      ? "Reset"
      : "Verify";

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading || !wixClient) return;
    setIsLoading(true);
    setError("");
    try {
      let response;
      switch (mode) {
        case "LOGIN":
          response = await wixClient.auth.login({
            email: inputs.email,
            password: inputs.password,
          });
          break;
        case "REGISTER":
          if (inputs.password !== inputs.confirmPassword) {
            setError("Passwords do not match");
            return;
          }
          response = await wixClient.auth.register({
            email: inputs.email,
            password: inputs.password,
            profile: { nickname: inputs.username },
          });
          break;
        case "RESET_PASSWORD":
          response = await wixClient.auth.sendPasswordResetEmail(
            inputs.email,
            window.location.href
          );
          setReset(true);
          break;
        case "EMAIL_VERIFICATION":
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }
      let tokens;
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          toast.loading("Successful You are being redirected", {
            position: "top-center",
            duration: 5000,
          });
          tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response?.data?.sessionToken
          );
          wixClient.auth.setTokens(tokens);
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          window.location.reload()
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode("EMAIL_VERIFICATION");
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          toast.error("Your account is pending approval");
          break;
        case LoginState.FAILURE:
          switch (response?.errorCode) {
            case "invalidEmail":
              setError("Invalid Email or Password");
              break;
            case "invalidPassword":
              setError("Invalid Email or Password");
              break;
            case "emailAlreadyExists":
              setError("Email Already Exist");
              break;
            case "resetPassword":
              setError("You need to reset your password");
              break;

            default:
              setError("Something went wrong");
              break;
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <Seo title={formTitle} description={formTitle} />
      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-base-200 p-2 lg:w-[40vw]">
        <h2 className="text-xl font-semibold">{formTitle}</h2>
        {mode === "LOGIN" ? (
          <form
            className="mt-3 flex h-[60%] w-full flex-col justify-around px-3"
            onSubmit={handleSubmit}
          >
            <label className="form-control gap-4">
              <label className="input input-bordered flex items-center gap-2 border-0 border-b bg-transparent focus:outline-0">
                <CiMail className="h-4 w-4 opacity-70" />
                <input
                  type="text"
                  className="grow"
                  value={inputs.email}
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </label>
            </label>
            <label className="form-control">
              <label className="input input-bordered flex items-center gap-2 border-0 border-b bg-transparent focus:outline-0">
                <CiLock className="h-4 w-4 opacity-70" />
                <input
                  type={see ? "text" : "password"}
                  className="grow"
                  placeholder="Password"
                  value={inputs.password}
                  name="password"
                  required
                  onChange={handleChange}
                />
                <div
                  className="btn btn-circle btn-ghost btn-sm"
                  onClick={() => setSee((prev) => !prev)}
                >
                  {see ? (
                    <FaEye className="h-4 w-4 opacity-70" />
                  ) : (
                    <FaEyeSlash className="h-4 w-4 opacity-70" />
                  )}
                </div>
              </label>
            </label>
            <div className="p-3">
              <div
                onClick={() => setMode("RESET_PASSWORD")}
                className="link-hover link link-accent text-sm"
              >
                Forgot password?
              </div>
            </div>
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <div className="loading loading-bars"></div>
              ) : (
                buttonTitle
              )}
            </button>
          </form>
        ) : mode === "REGISTER" ? (
          <form
            className="mt-3 flex w-full flex-col justify-around gap-4 px-3"
            onSubmit={handleSubmit}
          >
            <label className="form-control gap-2">
              <label className="input input-bordered flex items-center gap-2 border-0 border-b bg-transparent focus:outline-0">
                <CiUser className="h-4 w-4 opacity-70" />
                <input
                  type="text"
                  value={inputs.username}
                  className="grow"
                  placeholder="Username"
                  name="username"
                  required
                  onChange={handleChange}
                  minLength={4}
                />
              </label>
            </label>
            <label className="form-control gap-2">
              <label className="input input-bordered flex items-center gap-2 border-0 border-b bg-transparent focus:outline-0">
                <CiMail className="h-4 w-4 opacity-70" />
                <input
                  type="email"
                  value={inputs.email}
                  className="grow"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </label>
            </label>
            <label className="form-control gap-2">
              <label className="input input-bordered flex items-center gap-2 border-0 border-b bg-transparent focus:outline-0">
                <CiLock className="h-4 w-4 opacity-70" />
                <input
                  type={see ? "text" : "password"}
                  value={inputs.password}
                  className="grow"
                  placeholder="Password"
                  name="password"
                  required
                  minLength={4}
                  onChange={handleChange}
                />
              </label>
            </label>
            <label className="form-control gap-2">
              <label className="input input-bordered flex items-center gap-2 border-0 border-b bg-transparent focus:outline-0">
                <CiLock className="h-4 w-4 opacity-70" />
                <input
                  type={see ? "text" : "password"}
                  value={inputs.confirmPassword}
                  className="grow"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                />
              </label>
            </label>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Show password</span>
                <input
                  type="checkbox"
                  checked={see}
                  onChange={(e) => setSee(e.target.checked)}
                  className="checkbox checkbox-sm"
                />
              </label>
            </div>
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <div className="loading loading-bars"></div>
              ) : (
                buttonTitle
              )}
            </button>
          </form>
        ) : mode === "EMAIL_VERIFICATION" ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center justify-center gap-4 rounded-md p-4"
          >
            <OTPInput
              value={emailCode}
              onChange={(e) => setEmailCode(e)}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={"input text-base-content"}
              inputType="number"
            />
            <div
              onClick={() => setMode("LOGIN")}
              className="link-hover link link-secondary"
            >
              Go back to login
            </div>
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <div className="loading loading-bars"></div>
              ) : (
                buttonTitle
              )}
            </button>
            <Counter initialHours={0} initialMinutes={15} initialSeconds={0} />
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-3 flex w-full flex-col justify-around gap-4 px-3"
          >
            <h2>Enter your email</h2>
            {reset ? (
              <div className="text-success text-2xl">Check your email</div>
            ) : (
              <>
                <input
                  type="text"
                  className="input w-full"
                  name="email"
                  required
                  onChange={handleChange}
                  value={inputs.email}
                />
                <button className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <div className="loading loading-bars"></div>
                  ) : (
                    buttonTitle
                  )}
                </button>
              </>
            )}
          </form>
        )}
        {(mode === "LOGIN" ||
          mode === "REGISTER" ||
          mode === "RESET_PASSWORD") && (
          <>
            <LoginSocial />
            <div
              onClick={() => setMode(mode === "LOGIN" ? "REGISTER" : "LOGIN")}
              className="link-hover link link-secondary"
            >
              {mode === "LOGIN"
                ? `Don't have an account ?`
                : mode === "REGISTER"
                ? "Have an account?"
                : "Go back to login"}
            </div>
          </>
        )}
        {error && <div className="text-error mt-3 text-sm">{error}</div>}
      </div>
    </div>
  );
}
