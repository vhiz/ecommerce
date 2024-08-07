import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Toaster } from "react-hot-toast";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}
