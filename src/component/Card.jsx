import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useCartStore from "../hooks/useCartStore";
import { WixClientContext } from "../context/WixContext";
import { useContext } from "react";

export default function Card({ card, priceCut }) {
  const { addItem, isLoading } = useCartStore();
  const { wixClient } = useContext(WixClientContext);

  return (
    <div className="group btn btn-ghost h-[27rem] w-60 rounded-md shadow-lg transition-all hover:bg-transparent">
      <Link
        to={`/product/${card.slug}`}
        className="relative h-[62%] w-full overflow-hidden rounded-md"
      >
        <img
          src={card.media.mainMedia.image.url}
          alt=""
          className="absolute h-full w-full rounded-md object-cover duration-300 group-hover:scale-110"
        />
        {priceCut && (
          <div className="badge badge-error absolute right-2 top-2">
            {card.discount.value}%
          </div>
        )}
      </Link>
      <div className="flex h-[29%] w-full flex-col items-center justify-center gap-y-1">
        <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg">
          {card.name}
        </h2>
        <div className="">
          <p
            className={`mt-1 text-xs font-thin text-secondary ${
              priceCut ? "line-through opacity-60" : ""
            }`}
          >
            {card.price.formatted.price}
          </p>
          {priceCut && (
            <p className="text-xs font-thin">
              {card.price.formatted.discountedPrice}
            </p>
          )}
        </div>
        <button
          disabled={isLoading}
          onClick={() =>
            addItem(
              wixClient,
              card._id,
              "00000000-0000-0000-0000-000000000000",
              1
            )
          }
          className="group/button btn btn-primary btn-sm flex w-[7rem] items-center text-xs duration-300 ease-linear"
        >
          Add to cart
          <div className="hidden duration-300 ease-linear group-hover/button:block">
            <FaPlus />
          </div>
        </button>
      </div>
    </div>
  );
}
