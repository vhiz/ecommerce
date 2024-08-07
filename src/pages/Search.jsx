import { useSearchParams } from "react-router-dom";
import Seo from "../layout/Seo";
import SearchComp from "../component/SearchComp";
import Filter from "../component/Filter";
import Card from "../component/Card";
import { useContext, useEffect, useState } from "react";
import { WixClientContext } from "../context/WixContext";
import Loading from "../component/Loading";
import NotFound from "../component/NotFound";
import Pagination from "../component/Pagination";

export default function Search() {
  const [data, setData] = useState();
  const [page, setPage] = useState();
  const [searchParams] = useSearchParams();
  const { wixClient, loading } = useContext(WixClientContext);

  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      try {
        let productQuery = wixClient.products
          .queryProducts()
          .gt("priceData.price", searchParams.get("min") || 0)
          .lt("priceData.price", searchParams.get("max") || 9999999999)
          .limit(10)
          .skip(
            searchParams.get("page")
              ? parseInt(searchParams.get("page")) * 10
              : 0
          );
        // .find();
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
        setPage(res);
        const query = searchParams.get("query")?.toLowerCase() || "";
        const filteredProducts = res.items.filter(
          (item) =>
            item.description.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item?.brand?.toLowerCase().includes(query)
        );

        setData(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [wixClient, loading, searchParams]);
  return (
    <div>
      <Seo
        title={searchParams.get("query") || "Products"}
        description={`Search result for ${
          searchParams.get("query") || "Products"
        }`}
      />
      <SearchComp />
      <div className="flex h-72 w-full items-center justify-between">
        <div className="group relative h-48 w-full cursor-pointer overflow-hidden shadow-lg">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-base-100/20 p-3">
            <h2 className="text-2xl font-semibold text-white md:text-4xl">
              Grab up to 50% off <br /> on Selected Products
            </h2>
          </div>
          <img
            src="/ad9.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <Filter />
      {loading || !data ? (
        <div className="my-6 flex w-full flex-wrap justify-around gap-4">
          {Array(15)
            .fill()
            .map((i, key) => (
              <Loading key={key} />
            ))}
        </div>
      ) : data.length < 1 ? (
        <NotFound />
      ) : (
        <div className="my-6 flex w-full flex-wrap justify-around gap-4">
          {data.map((item, i) => (
            <Card
              key={i}
              card={item}
              priceCut={item.discount.type !== "NONE"}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={page?.currentPage}
        hasPrev={page?.hasPrev()}
        hasNext={page?.hasNext()}
      />
    </div>
  );
}
