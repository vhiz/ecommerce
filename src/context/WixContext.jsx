import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { members } from "@wix/members";
import { currentCart, orders } from "@wix/ecom";
import { redirects } from "@wix/redirects";

export const WixClientContext = createContext(null);

export const WixClientProvider = ({ children }) => {
  const [wixClient, setWixClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const refreshToken = Cookies.get("refreshToken");
  useEffect(() => {
    const parsedRefreshToken = refreshToken ? JSON.parse(refreshToken) : {};

    const client = createClient({
      modules: {
        products,
        collections,
        members,
        currentCart,
        redirects,
        orders,
      },
      auth: OAuthStrategy({
        clientId: import.meta.env.VITE_CLIENT_ID,
        tokens: {
          accessToken: {
            value: "",
            expiresAt: 0,
          },
          refreshToken: parsedRefreshToken,
        },
      }),
    });
    setLoading(false);
    setWixClient(client);

    async function getUser() {
      const member = client.auth.loggedIn()
        ? await client.members.getCurrentMember({
            fieldsets: members.Set.FULL,
          })
        : null;
      setCurrentUser(member?.member);
    }

    async function visitor() {
      const client = createClient({
        auth: OAuthStrategy({
          clientId: import.meta.env.VITE_CLIENT_ID,
        }),
      });
      const tokens = await client.auth.generateVisitorTokens();
      Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
        expires: 1,
      });
    }
    if (refreshToken) {
      getUser();
    } else {
      visitor();
    }
  }, [refreshToken]);
  return (
    <WixClientContext.Provider value={{ wixClient, loading, currentUser }}>
      {children}
    </WixClientContext.Provider>
  );
};
