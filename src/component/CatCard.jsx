import { Link } from "react-router-dom";

export default function CatCard({ cat }) {
  return (
    <Link
      to={`/products/${cat.slug}`}
      className="group h-fit w-48 cursor-pointer"
    >
      <figure className="relative h-64 w-full overflow-hidden rounded-md bg-base-200/50">
        <img
          src={cat.media.mainMedia.image?.url}
          alt=""
          className="absolute h-full w-full object-cover duration-500 group-hover:scale-110"
        />
      </figure>
      <span className="mt-7 font-semibold">{cat.name}</span>
    </Link>
  );
}
