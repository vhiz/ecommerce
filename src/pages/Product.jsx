import { Link, useNavigate, useParams } from "react-router-dom";
import Seo from "../layout/Seo";
import DOMPurify from "isomorphic-dompurify";
import CustomizeProduct from "../component/CustomizeProduct";
import AddToCart from "../component/AddToCart";
import { useContext, useEffect, useState } from "react";
import { WixClientContext } from "../context/WixContext";
import Reviews from "../component/Reviews";

export default function Product() {
  const [product, setProduct] = useState();
  const { wixClient, loading } = useContext(WixClientContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    async function fetchData() {
      try {
        const { items } = await wixClient.products
          .queryProducts()
          .eq("slug", slug)
          .find();
        if (items.length < 1) {
          navigate("/");
        }
        setProduct(items[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [wixClient, loading, slug, navigate]);

  if (loading || !product) {
    return (
      <div className="flex flex-col gap-4 lg:flex-row lg:p-3">
        <div className="flex h-fit items-center justify-center px-3 lg:sticky lg:top-20 lg:flex-1 lg:px-0">
          <div className="w-full lg:w-[80%]">
            <figure className="skeleton group relative h-80 w-full overflow-hidden rounded-md" />

            <div className="mt-3 flex w-full gap-3">
              {Array(3)
                .fill()
                .map((img, i) => (
                  <figure
                    key={i}
                    className="skeleton group relative h-40 flex-1 overflow-hidden rounded-md"
                  ></figure>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-1 lg:flex-1 lg:px-0">
          <div className="skeleton w-full h-16" />
          <div className="skeleton w-full h-32 mt-3" />

          <div className="divider" />
          <div className="skeleton w-full h-16" />
          <div className="divider" />

          <div className="skeleton w-full h-16" />
          <div className="divider" />
          <div className="flex flex-col gap-4 px-2 lg:p-0">
            {Array(3)
              .fill()
              .map((info, i) => (
                <div key={i} className="">
                  <div className="skeleton w-[60%] h-10" />

                  <div className="skeleton w-full h-48 mt-3" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  console.log();
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:p-3">
      <Seo
        title={product.name}
        description={product.description + product.brand}
      />
      <div className="flex h-fit items-center justify-center px-3 lg:sticky lg:top-20 lg:flex-1 lg:px-0">
        <div className="w-full lg:w-[80%]">
          <figure className="group relative h-80 w-full overflow-hidden rounded-md">
            <img
              src={product.media.mainMedia.image.url}
              alt=""
              className="absolute h-full w-full object-cover duration-500 group-hover:scale-110"
            />
          </figure>
          <div className="mt-3 flex w-full gap-3">
            {product.media.items.map((img, i) => (
              <figure
                key={i}
                className="group relative h-40 flex-1 overflow-hidden rounded-md"
              >
                <img
                  src={img.image.url}
                  alt=""
                  className="absolute h-full w-full object-cover duration-500 group-hover:scale-110"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col px-1 lg:flex-1 lg:px-0">
        <h1 className="text-xl font-semibold uppercase lg:text-3xl">
          {product.name}{" "}
          {product.brand && (
            <div className="badge badge-ghost badge-sm">
              <Link
                to={`/search?query=${product.brand}`}
                className="link-hover link"
              >
                {product.brand}
              </Link>
            </div>
          )}
        </h1>
        <span className=" mt-3 text-xs opacity-80 lg:text-sm">
          {product.description}
        </span>
        <div className="divider" />

        {product.variants && product.productOptions ? (
          <CustomizeProduct product={product} />
        ) : (
          <>
            <div className="flex items-center gap-3">
              {product.discount.type !== "NONE" && (
                <span className="scale-90 line-through opacity-50">
                  {product.price.formatted.price}
                </span>
              )}
              <span className="text-lg">
                {product.price.formatted.discountedPrice}
              </span>
            </div>
            <div className="divider" />
            <AddToCart
              productId={product._id}
              variantId={"00000000-0000-0000-0000-000000000000"}
              stockNumber={product.stock?.quantity || 0}
            />
          </>
        )}
        <div className="divider" />
        <div className="flex flex-col gap-4 px-2 lg:p-0">
          {product.additionalInfoSections.map((info) => (
            <div key={info.title} className="">
              <h2 className="text-lg font-semibold uppercase">{info.title}</h2>
              <div
                className="mt-2 text-xs lg:text-sm"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(info?.description),
                }}
              ></div>
            </div>
          ))}
        </div>
        <Reviews productId={product._id} />
      </div>
    </div>
  );
}
