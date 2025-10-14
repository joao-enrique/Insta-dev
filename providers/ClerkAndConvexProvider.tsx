// app/providers/ClerkAndConvexProvider.tsx
import { tokenCache } from "@/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

const publishableKey =
  "pk_test_bW92ZWQtZGlub3NhdXItMzIuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function ClerkAndConvexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
