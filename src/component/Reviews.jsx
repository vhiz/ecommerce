import { useEffect, useState } from "react";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch(
        `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${
          import.meta.env.VITE_FERA_ID
        }`
      );
      const { data } = await response.json();
      setReviews(data);
      setIsLoading(false);
    }
    fetchReviews();
  }, [productId]);
  if(loading){
    return(
        <div className="loading"></div>
    )
  }
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Reviews</h2>

      {reviews.map((review) => (
        <div className="flex flex-col gap-4 mt-3" key={review.id}>
          <div className="flex items-center gap-4 font-medium">
            <div className="avatar">
              <div className="mask mask-hexagon w-16">
                <img src={review.customer.avatar_url} />
              </div>
            </div>
            <span>{review.customer.display_name}</span>
          </div>
          <div className="rating rating-sm">
            {Array.from({ length: review.rating }).map((_, i) => (
              <input
                key={i}
                type="radio"
                name="rating-4"
                disabled
                className="mask mask-star-2 bg-orange-500 cursor-default"
              />
            ))}
          </div>
          {review.heading && <p>{review.heading}</p>}
          {review.body && <p>{review.body}</p>}
          <div className="">
            {review.media.map((media) => (
              <div key={media.id} className="avatar">
                <div className="w-16 rounded-xl">
                  <img src={media.url} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
