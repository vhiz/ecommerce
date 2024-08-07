import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Toggle from "./Toggle";
import { WixClientContext } from "../context/WixContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useCartStore from "../hooks/useCartStore";

export default function Navbar() {
  const { wixClient, currentUser, loading } = useContext(WixClientContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, getCart, count } = useCartStore();

  useEffect(() => {
    if (!wixClient) return;
    getCart(wixClient);
  }, [wixClient, getCart]);

  async function handleLogout() {
    if (!wixClient) return;
    setIsLoading(true);
    try {
      Cookies.remove("refreshToken");
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      navigate(logoutUrl);
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="navbar sticky top-0 z-40 bg-base-100">
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost btn-xs text-xl lg:btn-md hover:bg-transparent"
        >
          <img src="/logo.png" alt="" className="w-10 lg:w-20" />
        </Link>
      </div>
      <div className="flex-none">
        <Toggle />
        <div className="dropdown dropdown-end dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <div className="indicator">
              <MdOutlineShoppingCart className="text-xl" />
              <span className="badge indicator-item badge-sm">{count}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact z-[1] w-56 lg:w-80 bg-base-100 shadow"
          >
            <Cart cart={cart} />
          </div>
        </div>
        {!wixClient || loading ? (
          <div className="skeleton w-10 h-10 ml-2 rounded-full"></div>
        ) : currentUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    currentUser.img ||
                    `https://avatar.iran.liara.run/username?username=${currentUser?.profile?.nickname}`
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <div className="p-2">
                <h2 className="font-semibold text-lg">Welcome,</h2>
                <span className="text-sm">
                  {currentUser?.profile?.nickname}
                </span>
              </div>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button
                  disabled={isLoading}
                  className={`${isLoading ? "btn-disabled" : ""}`}
                  onClick={handleLogout}
                >
                  {isLoading ? <div className="loading"></div> : "Logout"}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth"
            className="btn btn-outline btn-error btn-sm ml-3 rounded-box"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
