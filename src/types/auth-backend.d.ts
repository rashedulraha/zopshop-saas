/**
 * Type-only shim for the backend `auth` instance from better-auth.
 * This avoids cross-package module resolution conflicts between the
 * backend's NodeNext module system and the frontend's bundler moduleResolution.
 *
 * The `inferAdditionalFields` plugin uses `typeof auth` purely for its type,
 * so we only need the shape — not the runtime value.
 */

import type { betterAuth } from "better-auth";

// Mirror the additionalFields from Zopshop-bakcend/src/lib/auth.ts
type AuthInstance = ReturnType<
  typeof betterAuth<{
    user: {
      additionalFields: {
        role: {
          type: "string";
        };
        storeId: {
          type: "string";
          required: false;
        };
      };
    };
  }>
>;

export declare const auth: AuthInstance;
