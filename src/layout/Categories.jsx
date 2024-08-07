import { useContext, useEffect, useState } from "react";
import CatCard from "../component/CatCard";
import Slider from "./Slider";
import { SwiperSlide } from "swiper/react";
import { WixClientContext } from "../context/WixContext";
import Loading from "../component/Loading";

export default function Categories() {
  const breakPoints = {
    480: { slidesPerView: 2, spaceBetween: 30 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    960: { slidesPerView: 4, spaceBetween: 30 },
    1300: { slidesPerView: 5, spaceBetween: 30 },
  };
  const [data, setData] = useState();
  const { wixClient, loading } = useContext(WixClientContext);
  useEffect(() => {
    if (loading) return;
    async function fetchData() {
      try {
        const { items } = await wixClient.collections
          .queryCollections()
          .find();

        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [wixClient, loading]);
  if (loading || !data) {
    return (
      <Slider loader h2={"Categories"} breakPoints={breakPoints}>
        {Array(5)
          .fill()
          .map((i, key) => (
            <SwiperSlide key={key}>
              <Loading />
            </SwiperSlide>
          ))}
      </Slider>
    );
  }
  return (
    <div className="my-3">
      <Slider h2={"Categories"} breakPoints={breakPoints}>
        {data.map((cat) => (
          <SwiperSlide key={cat.slug}>
            <CatCard cat={cat} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
