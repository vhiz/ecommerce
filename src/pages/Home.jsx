import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import Seo from "../layout/Seo";
import { FaHeadset } from "react-icons/fa6";
import { GiPiggyBank } from "react-icons/gi";
import Featured from "../layout/Featured";
import Recommended from "../layout/Recommended";
import Arrivals from "../layout/Arrivals";
import Categories from "../layout/Categories";
import SearchComp from "../component/SearchComp";

export default function Home() {
  return (
    <div>
      <Seo
        title={"Pi Mall"}
        description={`Pi Mall is an e-shopping website where customers can browse and purchase a wide variety of products from the comfort of their own home. This website typically features a user-friendly interface that allows customers to easily search for products, compare prices, read product descriptions, and make secure transactions.

Customers can create accounts on the website to track their orders, save their payment information, and receive updates on sales and promotions. The website may also offer features such as customer reviews, product recommendations, and virtual fitting rooms to help customers make informed purchasing decisions.

Pi Mall sells a range of products, including clothing, electronics, home goods, beauty products, and more.

Overall, Pi Mall provides a convenient and efficient way for customers to shop for products online, with the added convenience of having items delivered directly to their doorsteps.`}
      />
      <div className="group flex h-60 w-full items-center overflow-hidden bg-base-200 px-6 lg:justify-center">
        <div className="animate-fadeInLeft animate-delay-500">
          <h1 className="text-lg font-bold lg:text-4xl">
            Welcome to Pi Mall <br className="hidden lg:block" />
            Shop for you samsung <br className="hidden lg:block" /> products
          </h1>
          <button className="btn btn-primary btn-sm mt-3 text-primary-content lg:btn-md">
            Here
          </button>
        </div>
        <div className="animate-zoomIn">
          <div className="transition-all duration-700 group-hover:scale-75">
            <img src="/ad1.png" alt="" />
          </div>
        </div>
      </div>
      <SearchComp />
      <div className="my-3 flex w-full flex-col items-center gap-5 overflow-hidden px-2 lg:my-6 lg:h-72 lg:flex-row lg:justify-between lg:px-8">
        <div className="group relative h-48 w-full animate-fadeInRight cursor-pointer overflow-hidden rounded-lg shadow-lg animate-delay-700 lg:w-[25rem]">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center bg-base-100/20 p-3">
            <h2 className="text-2xl font-bold text-slate-900">
              Get discounts <br /> of up to <br />
              <h2 className="text-secondary">40%</h2>
            </h2>
          </div>
          <img
            src="/ad2.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
        <div className="group relative h-48 w-full animate-fadeInRight cursor-pointer overflow-hidden rounded-lg shadow-lg animate-delay-1000 lg:w-[25rem]">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-xl font-semibold text-secondary">
              Mobile <br /> Accessories
            </h2>
            <span className="font-semibold text-white">Just 0.01π</span>
          </div>
          <img
            src="/ad6.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
        <div className="group relative h-48 w-full animate-fadeInRight cursor-pointer overflow-hidden rounded-lg shadow-lg animate-delay-[1200ms] lg:w-[25rem]">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-xl font-bold text-slate-900">Iphone Cases</h2>
            <span className="mt-2 text-slate-800">Sale 25% off</span>
          </div>
          <img
            src="/ad4.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <Featured />

      <div className="my-6 flex h-72 w-full flex-col items-center gap-3 px-2 lg:flex-row lg:justify-between lg:gap-0 lg:px-8">
        <div className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-lg shadow-lg lg:w-[48%]">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-xl font-semibold text-secondary">
              Mobile <br /> Accessories
            </h2>
            <span className="font-semibold text-white">Just 0.01π</span>
          </div>
          <img
            src="/ad5.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
        <div className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-lg shadow-lg lg:w-[48%]">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-xl font-bold text-white">Superior Devices</h2>
            <span className="mt-2 text-slate-400">Sale 35% off</span>
          </div>
          <img
            src="/ad3.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <Recommended />
      <div className="my-6 flex h-72 w-full items-center justify-between px-2 lg:px-8">
        <div className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-lg shadow-lg">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-2xl font-semibold text-white">
              Apple Collection
            </h2>
            <span className="font-semibold text-white">Sales OFF 25%</span>
          </div>
          <img
            src="/ad8.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <Arrivals />
      <div className="mb-8 flex w-full flex-col gap-3 bg-base-200 p-4 lg:flex-row lg:items-center lg:justify-around">
        <div className="flex items-center gap-2">
          <CiDeliveryTruck className="text-6xl" />
          <div className="">
            <h3 className="font-semibold">FREE SHIPPING</h3>
            <p className="text-sm font-thin">For all Order Over $200</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CiCreditCard1 className="text-6xl" />
          <div className="">
            <h3 className="font-semibold">SECURE PAYMENT</h3>
            <p className="text-sm font-thin">All cards accepted</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaHeadset className="text-6xl" />
          <div className="">
            <h3 className="font-semibold">HELP CENTER</h3>
            <p className="text-sm font-thin">24/7 Support System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GiPiggyBank className="text-6xl" />
          <div className="">
            <h3 className="font-semibold">DISCOUNT</h3>
            <p className="text-sm font-thin">
              40% Discount for <br className="hidden lg:block" /> Member
            </p>
          </div>
        </div>
      </div>
      <Categories />
    </div>
  );
}
