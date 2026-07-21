import { createAuthClient } from "better-auth/react";
import { twoFactorClient, inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  plugins: [
    twoFactorClient(),
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
        storeId: { type: "string", required: false },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
