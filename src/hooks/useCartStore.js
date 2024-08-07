import { create } from "zustand";

const useCartStore = create((set) => ({
  count: 0,
  cart: [],
  isLoading: true,
  getCart: async function (wixClient) {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        count: cart?.lineItems.length || 0,
      });
    } catch (error) {
      console.log(error);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async function (wixClient, productId, variantId, quantity) {
    set((prev) => ({ ...prev, isLoading: true }));
    const res = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: import.meta.env.VITE_WIX_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity,
        },
      ],
    });
    set({
      cart: res.cart,
      isLoading: false,
      count: res.cart?.lineItems.length || 0,
    });
  },
  removeItem: async function (wixClient, lineItemId) {
    set((prev) => ({ ...prev, isLoading: true }));
    const res = await wixClient.currentCart.removeLineItemsFromCurrentCart([
      lineItemId,
    ]);
    set({
      cart: res.cart,
      isLoading: false,
      count: res.cart?.lineItems.length || 0,
    });
  },
}));

export default useCartStore;
