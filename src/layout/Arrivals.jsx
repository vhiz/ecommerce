import { useContext, useEffect, useState } from "react";
import ArrivalCard from "../component/ArrivalCard";
import TabSlider from "./TabSlider";
import { WixClientContext } from "../context/WixContext";

export default function Arrivals() {
  return (
    <div className="w-full lg:px-5">
      <h2 className="mb-3 text-xl font-semibold">New Arrivals</h2>
      <div role="tablist" className="tabs tabs-lifted mb-9">
        <input
          type="radio"
          name="arrivals"
          role="tab"
          className="tab"
          aria-label="Laptops"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          <Laptops />
        </div>

        <input
          type="radio"
          name="arrivals"
          role="tab"
          className="tab"
          aria-label="SmartPhones"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          <Phones />
        </div>

        <input
          type="radio"
          name="arrivals"
          role="tab"
          className="tab"
          aria-label="Tablets"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          <Tablets />
        </div>
      </div>
    </div>
  );
}

// laptop
function Laptops() {
  const [data, setData] = useState();
  const { wixClient, loading } = useContext(WixClientContext);
  useEffect(() => {
    if (loading) return;
    async function fetchData() {
      try {
        const { items } = await wixClient.products.queryProducts().find();

        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [wixClient, loading]);
  if (loading || !data) {
    return (
      <TabSlider>
        {Array(4)
          .fill()
          .map((item, i) => (
            <div
              key={i}
              className="flex h-28 w-full cursor-pointer items-center gap-2 rounded-lg p-2 md:w-72"
            >
              <div className="skeleton h-28 w-[30%] overflow-hidden rounded-md" />
              <div className="flex h-full flex-col gap-2">
                <div className="skeleton h-10 w-28 rounded-md" />
                <div className="skeleton h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
      </TabSlider>
    );
  }
  return (
    <TabSlider>
      {data
        .filter(
          (item) =>
            item.description.includes("laptop") || item.name.includes("laptop")
        )
        .map((item) => (
          <ArrivalCard
            key={item.slug}
            card={item}
            discount={item.discount.type !== "NONE"}
          />
        ))}
    </TabSlider>
  );
}

// phones
function Phones() {
  const [data, setData] = useState();
  const { wixClient, loading } = useContext(WixClientContext);
  useEffect(() => {
    if (loading) return;
    async function fetchData() {
      try {
        const { items } = await wixClient.products.queryProducts().find();

        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [wixClient, loading]);
  if (loading || !data) {
    return (
      <TabSlider>
        {Array(4)
          .fill()
          .map((item, i) => (
            <div
              key={i}
              className="flex h-28 w-full cursor-pointer items-center gap-2 rounded-lg p-2 md:w-72"
            >
              <div className="skeleton h-28 w-[30%] overflow-hidden rounded-md" />
              <div className="flex h-full flex-col gap-2">
                <div className="skeleton h-10 w-28 rounded-md" />
                <div className="skeleton h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
      </TabSlider>
    );
  }
  return (
    <TabSlider>
      {data
        .filter(
          (item) =>
            item.description.includes("phone") || item.name.includes("phone")
        )
        .map((item) => (
          <ArrivalCard
            key={item.slug}
            card={item}
            discount={item.discount.type !== "NONE"}
          />
        ))}
    </TabSlider>
  );
}

//tablets
function Tablets() {
  const [data, setData] = useState();
  const { wixClient, loading } = useContext(WixClientContext);
  useEffect(() => {
    if (loading) return;
    async function fetchData() {
      try {
        const { items } = await wixClient.products.queryProducts().find();

        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [wixClient, loading]);
  if (loading || !data) {
    return (
      <TabSlider>
        {Array(4)
          .fill()
          .map((item, i) => (
            <div
              key={i}
              className="flex h-28 w-full cursor-pointer items-center gap-2 rounded-lg p-2 md:w-72"
            >
              <div className="skeleton h-28 w-[30%] overflow-hidden rounded-md" />
              <div className="flex h-full flex-col gap-2">
                <div className="skeleton h-10 w-28 rounded-md" />
                <div className="skeleton h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
      </TabSlider>
    );
  }
  return (
    <TabSlider>
      {data
        .filter(
          (item) =>
            item.description.includes("tablet") || item.name.includes("tablet")
        )
        .map((item) => (
          <ArrivalCard
            key={item.slug}
            card={item}
            discount={item.discount.type !== "NONE"}
          />
        ))}
    </TabSlider>
  );
}
