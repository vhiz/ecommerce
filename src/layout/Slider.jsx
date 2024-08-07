import { useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";

export default function Slider({ children, h2, breakPoints, loader }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className={` relative my-10 px-8 lg:my-0`}>
      <h2 className="mb-4 text-xl font-semibold text-gray-400 md:text-3xl">
        {h2}
      </h2>
      <Swiper
        breakpoints={{
          ...breakPoints,
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        loop={true}
        modules={[Navigation]}
        className="flex h-full w-full items-center justify-center p-3"
      >
        {children}
      </Swiper>
      {children?.length > 1 && (
        <>
          {!loader && (
            <div className="absolute left-0 top-[50%] z-10 hidden h-0  w-full justify-between p-3 xl:flex">
              <button ref={prevRef} className="btn btn-circle ">
                <FaArrowLeftLong />
              </button>
              <button ref={nextRef} className="btn btn-circle">
                <FaArrowRightLong />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
