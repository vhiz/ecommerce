import { useContext, useEffect, useState } from "react";
import Card from "../component/Card";
import Filter from "../component/Filter";
import Seo from "../layout/Seo";
import { WixClientContext } from "../context/WixContext";
import Loading from "../component/Loading";
import { useParams, useSearchParams } from "react-router-dom";
import SearchComp from "../component/SearchComp";
import Pagination from "../component/Pagination";

export default function Products() {
  const [data, setData] = useState();
  const [products, setProducts] = useState(null);
  const { wixClient, loading } = useContext(WixClientContext);
  const { cat } = useParams();
  let [searchParams] = useSearchParams();
  useEffect(() => {
    if (loading) return;
    async function fetchData() {
      try {
        const { collection } = await wixClient.collections.getCollectionBySlug(
          cat
        );

        setData(collection);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [wixClient, loading, cat]);
  useEffect(() => {
    if (loading || !data) return;

    const fetchData = async () => {
      try {
        let productQuery = wixClient.products
          .queryProducts()
          .eq("collectionIds", data._id)
          .gt("priceData.price", searchParams.get("min") || 0)
          .lt("priceData.price", searchParams.get("max") || 9999999999)
          .limit(10)
          .skip(
            searchParams.get("page")
              ? parseInt(searchParams.get("page")) * 10
              : 0
          );

        const sortParam = searchParams.get("sort");
        if (sortParam) {
          const [sortType, sortBy] = sortParam.split(" ");
          if (sortType === "asc") {
            productQuery = productQuery.ascending(sortBy);
          }
          if (sortType === "desc") {
            productQuery = productQuery.descending(sortBy);
          }
        }

        const res = await productQuery.find();
        setProducts(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [wixClient, loading, cat, data, searchParams, setProducts]);
  return (
    <div>
      <Seo title={data?.name || ""} description={data?.description} />
      <SearchComp />
      <div className="flex h-72 w-full items-center justify-between">
        <div className="group relative h-48 w-full cursor-pointer overflow-hidden shadow-lg">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-2xl font-semibold text-white md:text-4xl">
              {data?.name || "All Products"}
            </h2>
          </div>
          <img
            src={data?.media.mainMedia.image.url || "/ad2.jpg"}
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <Filter page={"cat"} cat={"featured"} />
      <h2 className="m-2 text-xl font-semibold lg:text-3xl">
        All the products for you
      </h2>
      {loading || !products ? (
        <div className="my-6 flex w-full flex-wrap justify-around gap-4">
          {Array(15)
            .fill()
            .map((i, key) => (
              <Loading key={key} />
            ))}
        </div>
      ) : (
        <div className="my-6 flex w-full flex-wrap justify-around gap-4">
          {products?._items.map((item, i) => (
            <Card
              key={i}
              card={item}
              priceCut={item.discount.type !== "NONE"}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={products?.currentPage}
        hasPrev={products?.hasPrev()}
        hasNext={products?.hasNext()}
      />
    </div>
  );
}
