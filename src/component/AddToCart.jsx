import { useContext, useState } from "react";
import { WixClientContext } from "../context/WixContext";
import useCartStore from "../hooks/useCartStore";

export default function AddToCart({ productId, variantId, stockNumber }) {
  const { wixClient } = useContext(WixClientContext);
  const { addItem, isLoading } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };
  async function addToCurrentCart() {
    addItem(wixClient, productId, variantId, quantity);
  }
  return (
    <div className="flex flex-col gap-2 p-3">
      <h2 className="font-semibold">Choose Quantity</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ul className="join">
            <li
              className="btn join-item btn-sm rounded-l-full bg-gray-500/30 hover:bg-gray-500/50"
              onClick={() => handleQuantity("d")}
            >
              -
            </li>
            <input
              type="number"
              className="input input-sm join-item w-max border-none outline-none focus:outline-none"
              value={quantity}
              readOnly
              max={3}
              min={0}
            />
            <li
              className="btn join-item btn-sm rounded-r-full bg-gray-500/30 hover:bg-gray-500/50"
              onClick={() => handleQuantity("i")}
            >
              +
            </li>
          </ul>
          {stockNumber < 1 ? (
            <div className="text-xs text-accent">Product Out of stock</div>
          ) : (
            <div className="text-xs text-accent">
              Only{" "}
              <span className="text-base-content">{stockNumber} items</span>{" "}
              left <br />
              {`Don't miss it`}
            </div>
          )}
        </div>
        <button
          onClick={addToCurrentCart}
          className="btn btn-outline btn-primary btn-sm"
          disabled={isLoading}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
