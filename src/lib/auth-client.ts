import { createAuthClient } from "better-auth/react";
import { twoFactorClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../../../Zopshop-bakcend/src/lib/auth"; // Optional if types are imported

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  plugins: [twoFactorClient(), inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
