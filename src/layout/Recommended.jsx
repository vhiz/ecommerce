import { SwiperSlide } from "swiper/react";
import Slider from "./Slider";
import Card from "../component/Card";
import { useContext, useEffect, useState } from "react";
import { WixClientContext } from "../context/WixContext";
import Loading from "../component/Loading";

export default function Recommended() {
  const breakPoints = {
    518: { slidesPerView: 2, spaceBetween: 30 },
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
        const { items } = await wixClient.products
          .queryProducts()
          .eq("collectionIds", import.meta.env.VITE_FEATURED_ID)
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
      <Slider loader breakPoints={breakPoints} h2={"Recommended Products"}>
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
    <Slider breakPoints={breakPoints} h2={"Recommended Products"}>
      {data.map((card) => (
        <SwiperSlide key={card.slug}>
          <Card card={card} priceCut={card.discount.type !== "NONE"} />
        </SwiperSlide>
      ))}
    </Slider>
  );
}
