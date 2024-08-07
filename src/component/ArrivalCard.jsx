import { Link } from "react-router-dom";

export default function ArrivalCard({ card, discount }) {
  return (
    <Link
      to={`/product/${card.slug}`}
      className="group btn-ghost flex h-24 w-full cursor-pointer items-center gap-4 rounded-lg p-2 md:w-72"
    >
      <figure className="relative h-full w-[30%] overflow-hidden rounded-md">
        <img
          src={card.media.mainMedia.image.url}
          alt=""
          className="absolute h-full w-full object-cover duration-300 group-hover:scale-125"
        />
      </figure>
      <div className="flex h-full flex-col justify-center gap-2">
        <h3 className="text-xs uppercase">{card.name}</h3>
        <div className="flex">
          {discount && (
            <span className="text-xs text-secondary scale-90 line-through opacity-60">
              {card.price.formatted.price}
            </span>
          )}
          <span className="text-xs text-secondary">
            {card.price.formatted.discountedPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}
