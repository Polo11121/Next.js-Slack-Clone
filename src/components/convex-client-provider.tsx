"use client";

import { PropsWithChildren } from "react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: PropsWithChildren) => (
  <ConvexAuthNextjsProvider client={convex}>
    {children}
  </ConvexAuthNextjsProvider>
);
