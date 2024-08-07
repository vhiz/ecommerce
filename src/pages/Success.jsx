import Seo from "../layout/Seo";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export default function Success() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  useEffect(() => {
    if (!orderId) return;
    const timer = setTimeout(() => {
      navigate("/orders/" + orderId);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate, orderId]);
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
      <Seo title={"Success"} description={"success"} />
      <h1 className="text-6xl text-green-600">Successful</h1>
      <h2 className="text-xl font-medium">We sent an invoice to your email</h2>
      <h3>You are being redirected to order page...</h3>
      <Confetti width={width - 17} height={height} />
    </div>
  );
}
