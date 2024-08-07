import { useContext } from "react";
import useCartStore from "../hooks/useCartStore";
import { WixClientContext } from "../context/WixContext";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import toast from "react-hot-toast";

export default function Cart({ cart }) {
  const { removeItem, isLoading } = useCartStore();
  const { wixClient } = useContext(WixClientContext);
  async function handleCheckout() {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });
      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPage: `${window.location.origin}/success`,
          },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.log(error.details.applicationError.description);
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="card-body">
      <div className="w-full">
        {!cart || cart.length < 1 ? (
          <div className="p-3 flex items-center justify-center text-lg opacity-70">
            Cart is Empty
          </div>
        ) : (
          <div className="w-full">
            <h2 className="font-semibold text-base">Shopping Cart</h2>
            <div className="flex flex-col mt-3 max-h-80 overflow-y-scroll scrollbar-none">
              {cart?.lineItems.map((item) => (
                <div key={item._id}>
                  <div className="flex gap-4 items-center justify-between">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 lg:w-20">
                        <img
                          src={wixMedia.getScaledToFillImageUrl(
                            item.image,
                            100,
                            100,
                            {}
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-[70%] justify-between">
                      <div className="w-full flex justify-between text-xs">
                        <h2 className="font-semibold text-xs">
                          {item.productName.translated} <br />
                          <span className="text-accent font-normal lowercase">
                            {item.availability?.status}
                          </span>
                        </h2>
                        <div className="flex items-center">
                          {item.quantity && item.quantity > 1 && (
                            <div className="text-xs text-info">
                              {item.quantity}x
                            </div>
                          )}
                          {item.price.formattedAmount}
                        </div>
                      </div>
                      <div className="w-full flex justify-between text-xs">
                        <span>Qty: {item.quantity}</span>
                        <button
                          className={`link link-hover link-error ${
                            isLoading ? "disabled" : "disabled"
                          }`}
                          disabled={isLoading}
                          onClick={() => removeItem(wixClient, item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="divider opacity-50"></div>
                </div>
              ))}
            </div>
            <div className="">
              <div className="flex w-full items-center justify-between">
                <h2>Subtotal :</h2>
                <span>{cart.subtotal.formattedAmount}</span>
              </div>
              <span className="opacity-60 text-xs">
                Shopping and taxes calculated at checkout
              </span>
            </div>
          </div>
        )}
      </div>
      {(!cart || cart?.lineItems?.length > 0) && (
        <div className="flex w-full items-center justify-between">
          <button className="btn btn-outline btn-xs md:btn-sm">
            View Cart
          </button>
          <button
            className="btn btn-primary btn-xs md:btn-sm"
            disabled={isLoading}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
