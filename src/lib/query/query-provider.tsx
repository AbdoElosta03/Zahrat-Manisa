"use client";

/**
 * Query Provider
 *
 * Shares a single QueryClient and its cache across all child components.
 *
 * Example:
 * The Sidebar, Header, and Dashboard may all need the current user data.
 * When the Sidebar fetches the user using useQuery, the result is cached.
 * The Header and Dashboard can reuse the same cached data without
 * making duplicate API requests for the same query.
 *
 * Also keeps the QueryClient instance stable across re-renders.
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

import { createQueryClient } from "./query-client";

export function QueryProvider({ children }: { children: ReactNode }) {
  // There are no suspense queries below this provider. Each SSR render has its own instance.
  const [client] = useState(createQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
